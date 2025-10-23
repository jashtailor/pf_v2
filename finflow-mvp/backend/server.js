import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from './db.js';
import { auth } from './middleware.js';
import { categorize } from './categorizer.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ============================================
// AUTH ROUTES
// ============================================

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hash = await bcrypt.hash(password, 10);
    const result = db.prepare('INSERT INTO users (email, password, name) VALUES (?, ?, ?)').run(email, hash, name);

    const token = jwt.sign({ userId: result.lastInsertRowid }, process.env.JWT_SECRET);

    res.json({ token, userId: result.lastInsertRowid, name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.json({ token, userId: user.id, name: user.name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// TRANSACTION ROUTES
// ============================================

app.get('/api/transactions', auth, (req, res) => {
  const txns = db.prepare(`
    SELECT * FROM transactions
    WHERE user_id = ?
    ORDER BY date DESC
    LIMIT 100
  `).all(req.userId);

  res.json(txns);
});

app.post('/api/transactions', auth, (req, res) => {
  const { account_id, date, description, amount } = req.body;
  const category = categorize(description);

  const result = db.prepare(`
    INSERT INTO transactions (user_id, account_id, date, description, amount, category)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(req.userId, account_id || 1, date, description, amount, category);

  res.json({ id: result.lastInsertRowid, category });
});

app.put('/api/transactions/:id', auth, (req, res) => {
  const { category } = req.body;

  db.prepare('UPDATE transactions SET category = ? WHERE id = ? AND user_id = ?')
    .run(category, req.params.id, req.userId);

  res.json({ success: true });
});

// ============================================
// SIMPLEFIN ROUTES (Simplified)
// ============================================

app.post('/api/simplefin/connect', auth, async (req, res) => {
  // For MVP: Store a demo account
  db.prepare('INSERT OR REPLACE INTO accounts (id, user_id, name, balance) VALUES (1, ?, ?, ?)')
    .run(req.userId, 'Main Account', 5000);

  // Add demo transactions
  const demos = [
    { date: '2025-10-20', desc: 'Grocery Store', amount: -85.50 },
    { date: '2025-10-19', desc: 'Salary Deposit', amount: 3000 },
    { date: '2025-10-18', desc: 'Uber Ride', amount: -25 },
    { date: '2025-10-17', desc: 'Amazon Purchase', amount: -120 }
  ];

  for (const d of demos) {
    const cat = categorize(d.desc);
    db.prepare(`
      INSERT INTO transactions (user_id, account_id, date, description, amount, category)
      VALUES (?, 1, ?, ?, ?, ?)
    `).run(req.userId, d.date, d.desc, d.amount, cat);
  }

  res.json({ success: true, message: 'Demo account connected' });
});

app.post('/api/simplefin/sync', auth, (req, res) => {
  // For MVP: Just return success
  res.json({ imported: 0, message: 'Already synced' });
});

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
  console.log(`   Access from browser: http://localhost:${PORT}`);
});

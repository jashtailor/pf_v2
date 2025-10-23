# FinFlow MVP - Personal Finance App

A full-stack personal finance application with bank account integration, auto-categorized transactions, and a beautiful dashboard.

![Tech Stack](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-green)
![Tech Stack](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20Tailwind-blue)
![Database](https://img.shields.io/badge/Database-SQLite-orange)

---

## Features

✅ **User Authentication** - Secure signup/login with JWT tokens
✅ **Bank Integration** - SimpleFIN API support (demo mode included)
✅ **Auto-Categorization** - Smart transaction categorization
✅ **Dashboard** - Beautiful overview of balance, income, expenses
✅ **Transaction Management** - View and filter all transactions
✅ **Responsive Design** - Works on desktop and mobile

---

## Quick Start (Local Development)

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Run the App

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
```
Server runs on: http://localhost:3001

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
App runs on: http://localhost:5173

### 3. Test the App

1. Open http://localhost:5173
2. Sign up with any email/password
3. Click "Connect Bank" to add demo transactions
4. Explore the dashboard and transactions page!

---

## Deploy to Production

### Option 1: Render.com (Recommended - FREE)

**See full guide:** [`RENDER_DEPLOY.md`](./RENDER_DEPLOY.md)

**Quick Deploy:**
1. Push code to GitHub
2. Go to https://render.com
3. Sign up with GitHub
4. Click "New Blueprint"
5. Select this repo
6. Render auto-deploys using `render.yaml`
7. Done! 🎉

### Option 2: Other Services

- **Railway.app** - Fast deployment, $5/mo credit
- **Vercel** - Great for frontend
- **Fly.io** - Global deployment

**See full guides:**
- [`DEPLOY_WITH_GITHUB.md`](./DEPLOY_WITH_GITHUB.md) - All GitHub integration options
- [`DEPLOYMENT.md`](./DEPLOYMENT.md) - All deployment methods including ngrok

---

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (better-sqlite3)
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **CORS**: cors middleware

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Fetch API

---

## Project Structure

```
finflow-mvp/
├── backend/
│   ├── server.js          # Main Express server
│   ├── db.js              # SQLite database setup
│   ├── middleware.js      # JWT authentication
│   ├── categorizer.js     # Transaction categorization
│   ├── package.json
│   └── .env               # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React application
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Tailwind CSS
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── render.yaml            # Render.com deployment config
├── RENDER_DEPLOY.md       # Render deployment guide
├── DEPLOY_WITH_GITHUB.md  # GitHub integration guide
├── DEPLOYMENT.md          # All deployment options
└── README.md              # This file
```

---

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login existing user

### Transactions
- `GET /api/transactions` - Get all user transactions (requires auth)
- `POST /api/transactions` - Create new transaction (requires auth)
- `PUT /api/transactions/:id` - Update transaction category (requires auth)

### Bank Integration
- `POST /api/simplefin/connect` - Connect bank account (demo mode)
- `POST /api/simplefin/sync` - Sync transactions

---

## Environment Variables

### Backend (.env)
```env
JWT_SECRET=your-super-secret-key
PORT=3001
SIMPLEFIN_CLAIM_CODE=your-simplefin-claim-code
```

### Frontend (Production)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Database Schema

### Users
- id (PRIMARY KEY)
- email (UNIQUE)
- password (hashed)
- name
- created_at

### Accounts
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- name
- balance
- simplefin_url

### Transactions
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- account_id (FOREIGN KEY)
- date
- description
- amount
- category

---

## Transaction Categories

Auto-categorization rules:
- **Groceries**: grocery, market, trader joe, whole foods
- **Food & Drink**: restaurant, cafe, chipotle, starbucks
- **Transportation**: uber, lyft, gas, shell, mta
- **Shopping**: amazon, target, walmart
- **Bills**: verizon, comcast, electric, rent
- **Entertainment**: netflix, spotify, movies
- **Income**: payroll, deposit, salary
- **Other**: Everything else

---

## Roadmap

### Phase 1: MVP ✅ (Current)
- User authentication
- Demo bank connection
- Transaction categorization
- Basic dashboard

### Phase 2: Core Features
- [ ] Real SimpleFIN integration
- [ ] Manual transaction entry
- [ ] Budget tracking
- [ ] Spending insights

### Phase 3: Advanced Features
- [ ] Charts and visualizations
- [ ] Splitwise integration
- [ ] Export to CSV
- [ ] Mobile app (React Native)
- [ ] Recurring transactions
- [ ] Bill reminders

### Phase 4: Premium
- [ ] Multi-currency support
- [ ] Investment tracking
- [ ] Financial goals
- [ ] AI-powered insights

---

## Development

### Running Tests
```bash
# Coming soon
npm test
```

### Building for Production
```bash
cd frontend
npm run build
# Output in frontend/dist/
```

### Database Management
SQLite database is created automatically on first run.

Reset database:
```bash
cd backend
rm database.sqlite
node server.js  # Creates fresh database
```

---

## Security Notes

⚠️ **Important for Production:**
1. Change `JWT_SECRET` to a strong random string
2. Use HTTPS in production (Render provides this)
3. Add rate limiting for API endpoints
4. Implement proper error handling
5. Add input validation
6. Enable CORS only for your domain

---

## Contributing

This is an MVP project. Feel free to fork and customize!

Ideas for contributions:
- Additional transaction categories
- Better categorization logic
- UI/UX improvements
- Real SimpleFIN integration
- Test coverage

---

## License

MIT License - Feel free to use this for your own projects!

---

## Support

- **Issues**: Open an issue on GitHub
- **Deployment Help**: See deployment guides in this repo
- **Questions**: Check the guides first, then ask!

---

## Screenshots

*Add screenshots of your deployed app here!*

---

## Credits

Built with:
- React
- Express.js
- Tailwind CSS
- SimpleFIN API (planned)
- Render.com (hosting)

---

**Happy Budgeting! 💰**

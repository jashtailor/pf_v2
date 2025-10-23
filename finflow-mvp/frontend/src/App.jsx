import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';

const API_URL = 'http://localhost:3001/api';

// ============================================
// AUTH CONTEXT
// ============================================

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    if (token) {
      setUser({ token, name });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error('Login failed');

    const data = await res.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.name);
    setUser({ token: data.token, name: data.name });
  };

  const signup = async (email, password, name) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    if (!res.ok) throw new Error('Signup failed');

    const data = await res.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.name);
    setUser({ token: data.token, name: data.name });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

// ============================================
// API HELPER
// ============================================

async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!res.ok) throw new Error('API call failed');
  return res.json();
}

// ============================================
// NAVBAR COMPONENT
// ============================================

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-600">FinFlow</h1>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-purple-600">Dashboard</Link>
          <Link to="/transactions" className="hover:text-purple-600">Transactions</Link>
          <span className="text-gray-600">{user?.name}</span>
          <button onClick={logout} className="text-red-600 hover:text-red-700">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

// ============================================
// LOGIN PAGE
// ============================================

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignup) {
        await signup(email, password, name);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h1 className="text-3xl font-bold mb-6 text-center">FinFlow</h1>
        <h2 className="text-xl mb-6 text-center">{isSignup ? 'Create Account' : 'Welcome Back'}</h2>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-purple-600 ml-2 font-semibold hover:underline"
          >
            {isSignup ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}

// ============================================
// DASHBOARD PAGE
// ============================================

function Dashboard() {
  const [stats, setStats] = useState({ balance: 0, income: 0, expenses: 0 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const txns = await apiCall('/transactions');
      setTransactions(txns);

      const balance = txns.reduce((sum, t) => sum + t.amount, 0);
      const income = txns.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
      const expenses = Math.abs(txns.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));

      setStats({ balance, income, expenses });
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function connectBank() {
    try {
      await apiCall('/simplefin/connect', { method: 'POST' });
      loadData();
      alert('Bank connected! Demo transactions added.');
    } catch (err) {
      alert('Failed to connect bank');
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={connectBank}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Connect Bank
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500 text-sm mb-2">Total Balance</p>
          <p className="text-3xl font-bold">${stats.balance.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500 text-sm mb-2">Income</p>
          <p className="text-3xl font-bold text-green-600">${stats.income.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500 text-sm mb-2">Expenses</p>
          <p className="text-3xl font-bold text-red-600">${stats.expenses.toFixed(2)}</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>

        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No transactions yet. Connect your bank to get started!</p>
        ) : (
          <div className="space-y-2">
            {transactions.slice(0, 10).map(txn => (
              <div key={txn.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition">
                <div>
                  <p className="font-semibold">{txn.description}</p>
                  <p className="text-sm text-gray-500">{txn.category} • {txn.date}</p>
                </div>
                <p className={`font-bold text-lg ${txn.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {txn.amount > 0 ? '+' : ''}{txn.amount > 0 ? '$' : '-$'}{Math.abs(txn.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// TRANSACTIONS PAGE
// ============================================

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    const txns = await apiCall('/transactions');
    setTransactions(txns);
  }

  const filtered = filter === 'all'
    ? transactions
    : transactions.filter(t => t.category === filter);

  const categories = [...new Set(transactions.map(t => t.category))];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Transactions</h1>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg ${filter === cat ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-xl shadow">
        {filtered.map(txn => (
          <div key={txn.id} className="flex justify-between items-center p-4 border-b hover:bg-gray-50">
            <div className="flex-1">
              <p className="font-semibold">{txn.description}</p>
              <p className="text-sm text-gray-500">{txn.date}</p>
            </div>
            <div className="text-center px-4">
              <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                {txn.category}
              </span>
            </div>
            <div className="text-right">
              <p className={`font-bold text-lg ${txn.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {txn.amount > 0 ? '+' : ''}{txn.amount > 0 ? '$' : '-$'}{Math.abs(txn.amount).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// MAIN APP
// ============================================

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Navbar />
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/transactions" element={
            <ProtectedRoute>
              <Navbar />
              <Transactions />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

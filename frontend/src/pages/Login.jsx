import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ChefHat } from 'lucide-react';
import './Login.css';

const API_URL = '/api';

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    favouriteRecipe: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isRegister ? '/users/register' : '/users/login';
    const body = isRegister
      ? formData
      : { email: formData.email, password: formData.password };

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        setLoading(false);
        return;
      }

      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/profile');
    } catch (err) {
      setError('Server not reachable. Make sure backend is running.');
      setLoading(false);
    }
  };

  return (
    <div className="container login-page">
      <div className="login-container glass">
        <div className="login-header">
          <ChefHat size={48} color="var(--primary-color)" />
          <h1>{isRegister ? 'Create Account' : 'Welcome Back'}</h1>
          <p>{isRegister ? 'Join our community of food lovers' : 'Sign in to your account'}</p>
        </div>

        {error && <div className="alert error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {isRegister && (
            <div className="form-group">
              <div className="input-icon-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <div className="input-icon-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {isRegister && (
            <div className="form-group">
              <div className="input-icon-wrapper">
                <ChefHat size={18} className="input-icon" />
                <input
                  type="text"
                  name="favouriteRecipe"
                  placeholder="Your Favourite Recipe (e.g. Biryani)"
                  value={formData.favouriteRecipe}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <button type="submit" className="btn login-btn" disabled={loading}>
            {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="toggle-section">
          <p>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              className="toggle-btn"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
            >
              {isRegister ? 'Sign In' : 'Create Account'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

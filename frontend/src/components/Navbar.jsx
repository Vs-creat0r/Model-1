import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Utensils, UserCircle, ShoppingCart } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Check login state on every route change and storage event
  useEffect(() => {
    const updateUser = () => {
      const stored = localStorage.getItem('user');
      setUser(stored ? JSON.parse(stored) : null);
    };
    
    updateUser();
    window.addEventListener('storage', updateUser);
    return () => window.removeEventListener('storage', updateUser);
  }, [location]);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar glass">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <Utensils className="logo-icon" size={28} />
          <span>Indian Recipes</span>
        </Link>
        <ul className="nav-links">
          <li><Link to="/" className={isActive('/')}>Home</Link></li>
          <li><Link to="/veg" className={isActive('/veg')}>Veg</Link></li>
          <li><Link to="/non-veg" className={isActive('/non-veg')}>Non-Veg</Link></li>
          <li><Link to="/about" className={isActive('/about')}>About</Link></li>
          <li><Link to="/contact" className={isActive('/contact')}>Contact</Link></li>
          
          {user && (
            <li>
              <Link to="/cart" className={`nav-cart-btn ${isActive('/cart')}`}>
                <ShoppingCart size={20} />
                {user.cart && user.cart.length > 0 && (
                  <span className="cart-badge">{user.cart.length}</span>
                )}
              </Link>
            </li>
          )}

          <li>
            {user ? (
              <Link to="/profile" className={`nav-profile-btn ${isActive('/profile')}`}>
                <UserCircle size={20} />
                <span>{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link to="/login" className={`nav-login-btn ${isActive('/login')}`}>
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

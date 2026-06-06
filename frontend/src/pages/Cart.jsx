import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import './Cart.css';

const API_URL = '/api';

const Cart = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user and cart
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      navigate('/login');
      return;
    }
    
    const userData = JSON.parse(stored);
    setUser(userData);
    
    // Fetch latest user data to get accurate cart
    fetch(`${API_URL}/users/${userData._id}`)
      .then(res => res.json())
      .then(data => {
        setCart(data.cart || []);
        setLoading(false);
        // Sync local storage
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch(err => {
        console.error(err);
        setCart(userData.cart || []);
        setLoading(false);
      });
  }, [navigate]);

  const saveCartToDB = async (newCart) => {
    try {
      const res = await fetch(`${API_URL}/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: newCart }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        window.dispatchEvent(new Event('storage'));
      }
    } catch (err) {
      console.error('Failed to save cart to DB', err);
    }
  };

  const updateQuantity = (recipeId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const newCart = cart.map(item => 
      item.recipeId === recipeId ? { ...item, quantity: newQuantity } : item
    );
    setCart(newCart);
    saveCartToDB(newCart);
  };

  const removeItem = (recipeId) => {
    const newCart = cart.filter(item => item.recipeId !== recipeId);
    setCart(newCart);
    saveCartToDB(newCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (loading) {
    return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading Cart...</div>;
  }

  return (
    <div className="container cart-page">
      <div className="page-header">
        <h1>Your Cart</h1>
        <p style={{ color: 'var(--text-light)', marginTop: '10px' }}>Review your food order</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart glass">
          <ShoppingCart size={48} color="var(--text-light)" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any delicious recipes yet.</p>
          <button className="btn" onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
            Browse Recipes
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.recipeId} className="cart-item glass">
                <div className="cart-item-image" style={{ backgroundImage: `url(${item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80'})` }}></div>
                
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p className="cart-item-price">₹{item.price}</p>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.recipeId, item.quantity - 1)} className="qty-btn"><Minus size={16} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.recipeId, item.quantity + 1)} className="qty-btn"><Plus size={16} /></button>
                  </div>
                  
                  <div className="cart-item-total">
                    ₹{item.price * item.quantity}
                  </div>

                  <button className="delete-btn" onClick={() => removeItem(item.recipeId)}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary glass">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>₹50</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{calculateTotal() + 50}</span>
            </div>
            
            <button className="btn checkout-btn" onClick={() => alert('Checkout functionality coming soon!')}>
              Proceed to Checkout <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

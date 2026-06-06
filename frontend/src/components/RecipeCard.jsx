import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, ShoppingCart, Check } from 'lucide-react';
import './RecipeCard.css';

const API_URL = '/api';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event from bubbling up to the card link

    if (!user) {
      navigate('/login');
      return;
    }

    setAdding(true);

    // Re-read from localStorage to get the freshest cart data
    const freshUser = JSON.parse(localStorage.getItem('user'));
    const existingCart = freshUser.cart || [];
    const existingItem = existingCart.find(item => item.recipeId === String(recipe._id));

    let newCart;
    if (existingItem) {
      newCart = existingCart.map(item =>
        item.recipeId === String(recipe._id) ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...existingCart, {
        recipeId: String(recipe._id),
        title: recipe.title,
        image: recipe.image,
        price: recipe.price || 199,
        quantity: 1
      }];
    }

    try {
      const res = await fetch(`${API_URL}/users/${freshUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: newCart }),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        window.dispatchEvent(new Event('storage'));

        // Show a brief "Added!" confirmation
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      } else {
        const errData = await res.json();
        console.error('Server error:', errData.message);
      }
    } catch (err) {
      console.error('Failed to add to cart', err);
    } finally {
      setAdding(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/recipe/${recipe._id}`);
  };

  return (
    <div className="recipe-card glass hover-lift" onClick={handleCardClick} role="link" tabIndex={0}>
      <div className="card-img-container">
        <img src={recipe.image} alt={recipe.title} className="card-img" />
        <span className={`type-badge ${recipe.type.toLowerCase()}`}>{recipe.type}</span>
      </div>
      <div className="card-content">
        <h3 className="card-title">{recipe.title}</h3>
        <p className="card-category">{recipe.category}</p>
        <div className="card-meta">
          <div className="meta-item">
            <Clock size={16} />
            <span>{recipe.prepTime}</span>
          </div>
          <div className="meta-item">
            <Users size={16} />
            <span>{recipe.servings} serves</span>
          </div>
        </div>

        <button
          className={`add-to-cart-btn ${added ? 'added' : ''}`}
          onClick={handleAddToCart}
          disabled={adding}
        >
          {added ? (
            <><Check size={18} /> Added!</>
          ) : adding ? (
            <><ShoppingCart size={18} /> Adding...</>
          ) : (
            <><ShoppingCart size={18} /> Add to Cart</>
          )}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;

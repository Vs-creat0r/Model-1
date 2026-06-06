import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import './Home.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/api/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container hero-content">
          <h1 className="hero-title">Discover Authentic <br/>Indian Flavors</h1>
          <p className="hero-subtitle">Explore a rich collection of traditional and modern Indian recipes, handpicked for your culinary journey.</p>
          <div className="hero-buttons">
            <Link to="/veg" className="btn">Veg Recipes</Link>
            <Link to="/non-veg" className="btn btn-outline" style={{ background: 'var(--card-bg)' }}>Non-Veg Recipes</Link>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-header">
          <h2>Latest Recipes</h2>
        </div>
        <div className="grid">
          {recipes.slice(0, 6).map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

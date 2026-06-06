import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Users, ChefHat } from 'lucide-react';
import './RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Loading...</div>;
  if (!recipe) return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Recipe not found.</div>;

  return (
    <div className="recipe-details-page">
      <div className="recipe-header" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${recipe.image})` }}>
        <div className="container header-content">
          <span className={`type-badge ${recipe.type.toLowerCase()}`} style={{ position: 'relative', top: 0, right: 0, display: 'inline-block', marginBottom: '1rem' }}>
            {recipe.type}
          </span>
          <h1 className="title">{recipe.title}</h1>
          <p className="description">{recipe.description}</p>
          
          <div className="meta-info">
            <div className="meta-box glass">
              <Clock size={24} />
              <div>
                <span>Prep</span>
                <strong>{recipe.prepTime}</strong>
              </div>
            </div>
            <div className="meta-box glass">
              <ChefHat size={24} />
              <div>
                <span>Cook</span>
                <strong>{recipe.cookTime}</strong>
              </div>
            </div>
            <div className="meta-box glass">
              <Users size={24} />
              <div>
                <span>Serves</span>
                <strong>{recipe.servings}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container recipe-content">
        <div className="ingredients-section glass">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="steps-section">
          <h2>Cooking Steps</h2>
          <div className="steps-list">
            {recipe.steps.map((step, index) => (
              <div className="step-item" key={index}>
                <div className="step-number">{index + 1}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

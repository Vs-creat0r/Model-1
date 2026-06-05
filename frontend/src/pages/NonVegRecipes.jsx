import { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';

const API_URL = 'http://localhost:5000/api';

const NonVegRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch categories on mount
  useEffect(() => {
    fetch(`${API_URL}/recipes/categories`)
      .then(res => res.json())
      .then(data => setCategories(data.nonVeg || []))
      .catch(err => console.error(err));
  }, []);

  // Fetch recipes when filters change
  useEffect(() => {
    let url = `${API_URL}/recipes?type=Non-Veg`;
    if (selectedCategory) url += `&category=${selectedCategory}`;
    if (searchTerm) url += `&search=${searchTerm}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error(err));
  }, [selectedCategory, searchTerm]);

  return (
    <div className="container">
      <div className="page-header">
        <h1>Non-Vegetarian Recipes</h1>
        <p style={{ color: 'var(--text-light)', marginTop: '10px' }}>Indulge in rich, flavorful meat and seafood dishes.</p>
      </div>
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search non-veg recipes..." />
      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />

      <div className="grid">
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '3rem', color: 'var(--text-light)' }}>
            No recipes found. Try adjusting your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default NonVegRecipes;

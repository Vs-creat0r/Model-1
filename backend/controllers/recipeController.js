const fs = require('fs');
const path = require('path');

// Read recipes from JSON file
const getRecipesData = () => {
  const filePath = path.join(__dirname, '../data/recipes.json');
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }
  return [];
};

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
const getRecipes = (req, res) => {
  try {
    const { type, category, search } = req.query;
    let recipes = getRecipesData();

    if (type) {
      recipes = recipes.filter(r => r.type === type);
    }
    
    if (category) {
      recipes = recipes.filter(r => r.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      recipes = recipes.filter(r => searchRegex.test(r.title));
    }

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single recipe
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = (req, res) => {
  try {
    const recipes = getRecipesData();
    const recipe = recipes.find(r => r._id === req.params.id);
    
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get unique categories grouped by type
// @route   GET /api/recipes/categories
// @access  Public
const getCategories = (req, res) => {
  try {
    const recipes = getRecipesData();
    const vegCategories = [...new Set(recipes.filter(r => r.type === 'Veg').map(r => r.category))];
    const nonVegCategories = [...new Set(recipes.filter(r => r.type === 'Non-Veg').map(r => r.category))];
    res.json({ veg: vegCategories, nonVeg: nonVegCategories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  getCategories,
};

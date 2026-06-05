const express = require('express');
const router = express.Router();
const { getRecipes, getRecipeById, getCategories } = require('../controllers/recipeController');

router.route('/categories').get(getCategories);
router.route('/').get(getRecipes);
router.route('/:id').get(getRecipeById);

module.exports = router;

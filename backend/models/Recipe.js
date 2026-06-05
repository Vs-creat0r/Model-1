const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true, enum: ['Veg', 'Non-Veg'] },
    category: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{ type: String }],
    steps: [{ type: String }],
    image: { type: String, required: true },
    prepTime: { type: String, required: true },
    cookTime: { type: String, required: true },
    servings: { type: Number, required: true },
    difficulty: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

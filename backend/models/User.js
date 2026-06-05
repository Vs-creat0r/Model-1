const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favouriteRecipe: { type: String, default: '' },
    cart: [
      {
        recipeId: { type: String, required: true },
        title: { type: String, required: true },
        image: { type: String },
        price: { type: Number, default: 199 }, // Mock price for food ordering
        quantity: { type: Number, required: true, default: 1 }
      }
    ]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;

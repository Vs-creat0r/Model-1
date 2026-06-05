const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('./models/Recipe');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const recipes = [
  {
    title: 'Paneer Butter Masala',
    type: 'Veg',
    category: 'Paneer',
    description: 'A rich and creamy curry made with paneer, spices, onions, tomatoes, cashews and butter.',
    ingredients: ['Paneer', 'Butter', 'Onion', 'Tomato', 'Cashews', 'Garam Masala', 'Cream'],
    steps: [
      'Fry paneer cubes lightly.',
      'Sauté onions and tomatoes, blend to a smooth paste with cashews.',
      'Cook the paste with butter and spices.',
      'Add paneer and finish with cream.'
    ],
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    prepTime: '20 min',
    cookTime: '30 min',
    servings: 4,
    difficulty: 'Medium'
  },
  {
    title: 'Chicken Biryani',
    type: 'Non-Veg',
    category: 'Chicken',
    description: 'A world-renowned Indian dish, biryani takes time and practice to make but is worth every effort.',
    ingredients: ['Basmati Rice', 'Chicken', 'Onions', 'Yogurt', 'Biryani Masala', 'Saffron', 'Mint Leaves'],
    steps: [
      'Marinate chicken in yogurt and spices.',
      'Cook basmati rice with whole spices until 70% done.',
      'Layer chicken and rice in a heavy-bottomed pot.',
      'Seal and cook on low heat (Dum).'
    ],
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    prepTime: '30 min',
    cookTime: '45 min',
    servings: 6,
    difficulty: 'Hard'
  },
  {
    title: 'Dal Makhani',
    type: 'Veg',
    category: 'Dal',
    description: 'A classic Indian dish made with whole urad dal, rajma, butter and spices.',
    ingredients: ['Whole Black Gram (Urad Dal)', 'Kidney Beans (Rajma)', 'Butter', 'Cream', 'Tomato Puree', 'Ginger Garlic Paste'],
    steps: [
      'Soak dal and rajma overnight.',
      'Pressure cook until soft.',
      'Simmer with tomato puree, ginger garlic paste, and spices.',
      'Finish with butter and cream.'
    ],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    prepTime: '8 hours',
    cookTime: '1 hour',
    servings: 5,
    difficulty: 'Medium'
  },
  {
    title: 'Fish Curry',
    type: 'Non-Veg',
    category: 'Fish',
    description: 'A spicy and tangy fish curry popular in coastal India.',
    ingredients: ['Fish chunks', 'Coconut milk', 'Tamarind paste', 'Curry leaves', 'Mustard seeds', 'Chili powder'],
    steps: [
      'Marinate fish with turmeric and salt.',
      'Temper mustard seeds and curry leaves in oil.',
      'Add onion, tomato, and spices.',
      'Add coconut milk, tamarind, and fish. Simmer until cooked.'
    ],
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    prepTime: '15 min',
    cookTime: '25 min',
    servings: 4,
    difficulty: 'Easy'
  }
];

const importData = async () => {
  try {
    await Recipe.deleteMany();
    await Recipe.insertMany(recipes);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();

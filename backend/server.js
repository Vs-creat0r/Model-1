const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

// Connect to MongoDB (for users & contacts)
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/recipes', recipeRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Indian Recipes API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

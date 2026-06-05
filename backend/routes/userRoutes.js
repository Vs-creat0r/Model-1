const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/:id').get(getUserProfile).put(updateUserProfile);

module.exports = router;

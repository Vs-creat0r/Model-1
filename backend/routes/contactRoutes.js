const express = require('express');
const router = express.Router();
const { submitContact } = require('../controllers/contactController');

router.route('/').post(submitContact);

module.exports = router;

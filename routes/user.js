const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// route for checking if user is registered or not
router.get('/google/success', userController.checkUser);

module.exports = router;
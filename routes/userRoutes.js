const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getAllUsers, getProfile } = require('../controllers/userController');

// Route untuk mendapatkan semua data user
router.get('/profile', verifyToken.protect, getProfile);
router.get('/users', getAllUsers);

module.exports = router;

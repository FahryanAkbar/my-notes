const express = require('express');
const { register, login } = require('../controllers/authController');
const upload = require('../config/multer');
const router = express.Router();

router.post('/register', upload.single('profilePic'), register);
router.post('/login', login);

module.exports = router;

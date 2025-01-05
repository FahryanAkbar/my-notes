const User = require('../models/User');

// Controller profil masing masing user jos
const getProfile = async (req, res) => {
    try {
      const user = req.user; // Data user dari middleware
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const { password, session, ...profile } = user.toObject();
      res.status(200).json(profile);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
};

// Controller untuk mendapatkan semua data user
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Mengambil semua data dari koleksi users
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { getAllUsers, getProfile };

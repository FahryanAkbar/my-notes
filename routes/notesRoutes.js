const express = require('express');
const router = express.Router();
const {createNote, getUserNotes, getNoteById, updateNote, deleteNote, getAllNotes} = require('../controllers/notesController');
const upload = require('../config/multer');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Route untuk user
router.post('/notes', protect, upload.single('document'), createNote);
router.get('/notes', protect, getUserNotes);
router.get('/notes/:id', protect, getNoteById);//baru
router.put('/notes/:id', protect, upload.single('document'), updateNote);
router.delete('/notes/:id', protect, deleteNote);

// Route untuk admin
router.get('/admin/notes', protect, isAdmin, getAllNotes);

module.exports = router;

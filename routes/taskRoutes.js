const express = require('express');
const router = express.Router();
const task = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.post('/task-create', protect, task.createTask);
router.get('/task', protect, task.getAll);
router.get('/task/category/:category', protect, task.getByCategory);
router.put('/task/:id', protect, task.updateTask);
router.delete('/task/:id', protect, task.deleteTask);

module.exports = router;
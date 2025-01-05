const Task = require('../models/Task');

const createTask = async (req, res) => {
    try {
        const {title, description, completed, category, detail} = req.body;
        if (!['study','exercise','diet','skincare','self dev', 'another'].includes(category)) {
            return res.status(400).json({ message: 'Invalid category' });
        }
        const newTask = new Task ({
            title,
            description,
            completed,
            category,
            detail,
            createdBy: req.user.id,
        });
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create task', error: error.message });
    }
};

const getByCategory = async (req, res) => {
    const {category} = req.params;
    if (!['study','exercise','diet','skincare','self dev', 'another'].includes(category)) {
        return res.status(400).json({ message: 'Invalid category' });
    }
    try {
        const tasks = await Task.find({category});
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
    }
}

const getAll = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
    }
};

const updateTask = async (req, res) => {
    const {id} = req.params;
    const updates = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, updates, {new: true});
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        res.status(200).json({ message: 'Failed to update task', error: error.message });
    }
};

const deleteTask = async (req, res) => {
    const {id} = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task', error: error.message });
    }
};

module.exports = {
    createTask,
    getByCategory,
    getAll,
    updateTask,
    deleteTask
};
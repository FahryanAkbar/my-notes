const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    taskName: {type: String, required: true},
});
const mongoose = require('mongoose');

const StudySchema = new mongoose.Schema({
    topic: {type: String, required: true},
    duration: {
        start: { type: String, required: true },
        end: { type: String, required: true }
    },
    goal: {type: String, required: true}
});

const ExerciseSchema = new mongoose.Schema({
    type: { type: String, required: true },
    duration: {
        start: { type: String, required: true },
        end: { type: String, required: true }
    },
    intensity: { type: String, required: true }
});

const DietSchema = new mongoose.Schema({
    meal: { type: String, required: true },
    calories: { type: Number, required: true },
    mealTime: { type: String, required: true }
});

const skincareSchema = new mongoose.Schema({
    product: { type: String, required: true },
    duration: {
        start: { type: String, required: true },
        end: { type: String, required: true }
    },
    goal: { type: String, required: true }
});

const SelfDevSchema = new mongoose.Schema({
    activity: { type: String, required: true },
    duration: {
        start: { type: String, required: true },
        end: { type: String, required: true }
    },
    goal: { type: String, required: true }
});

const AnotherSchema = new mongoose.Schema({
    activity: { type: String, required: true },
    duration: {
        start: { type: String, required: true },
        end: { type: String, required: true }
    },
    goal: { type: String, required: true }
});

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: {type: String, required: true},
    completed: {type: Boolean, required: true, default: false},
    category: {type: String, enum:['study','exercise','diet','skincare','self dev', 'another'], required: true},
    detail: {type: mongoose.Schema.Types.Mixed, required: true},
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
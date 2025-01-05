const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: {type: Date, required: true},
    content: { type: String, required: true },
    priority: {type: String, enum: ['rendah', 'sedang', 'tinggi'], default: 'rendah'},
    document: {type: String, required: false},
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
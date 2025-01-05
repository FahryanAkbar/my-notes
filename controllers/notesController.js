const Note = require('../models/Notes');
const User = require('../models/User');
const fs = require('fs');

// Membuat catatan baru
const createNote = async (req, res) => {
    try {
        const { title, date, content, priority } = req.body;

        const documentPath = req.file ? req.file.path : null;
        //const documentPath = req.file ?`/uploads/documents/${req.file.path}`: null;

        const newNote = new Note({
            title,
            date,
            content,
            priority,
            document: documentPath,
            createdBy: req.user.id, // Ambil user ID dari middleware
        });

        await newNote.save();

        res.status(201).json({ message: 'Catatan berhasil dibuat', note: newNote });
    } catch (error) {
        console.error('Error saving note:', error);  // Tambahkan log untuk mengetahui kesalahan lebih rinci
        res.status(500).json({ message: 'Gagal membuat catatan', error });
    }
};


const getUserNotes = async (req, res) => {
    try {
        const userId = req.user.id;

        const notes = await Note.find({ createdBy: userId });

        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mendapatkan catatan', error });
    }
};

const getNoteById = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findById(id); // Ambil note berdasarkan ID
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note); // Kirim data note sebagai response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateNote = async (req, res) => {
    try {
        const { id } = req.params; 
        const { title, date, content, priority } = req.body;

        const note = await Note.findOne({ _id: id, createdBy: req.user.id });
        if (!note) {
            return res.status(404).json({ message: 'Catatan tidak ditemukan atau Anda tidak memiliki akses' });
        }

        if (req.file) {
            if (note.document) {
                fs.unlink(note.document, (err) => {
                    if (err) console.log(`Gagal menghapus file lama: ${err}`);
                });
            }
            note.document = req.file.path;
        }

        note.title = title || note.title;
        note.date = date || note.date;
        note.content = content || note.content;
        note.priority = priority || note.priority;

        const updatedNote = await note.save();
        res.status(200).json({ message: 'Catatan berhasil diperbarui', note: updatedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gagal memperbarui catatan', error });
    }
};


const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const note = await Note.findOneAndDelete({ _id: id, createdBy: userId });
        if (!note) {
            return res.status(404).json({ message: 'Catatan tidak ditemukan atau tidak memiliki akses' });
        }

        // Hapus file jika ada
        if (note.document) {
            fs.unlink(note.document, (err) => {
                if (err) console.log(`Gagal menghapus file: ${err}`);
            });
        }

        res.status(200).json({ message: 'Catatan berhasil dihapus' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gagal menghapus catatan', error });
    }
};

// admin
const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().populate('createdBy', 'username email');
        console.log('Notes fetched from database:', notes); 
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mendapatkan catatan', error });
    }
};

module.exports = {
    createNote,
    getUserNotes,
    getNoteById,
    updateNote,
    deleteNote,
    getAllNotes,
};

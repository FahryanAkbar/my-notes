const multer = require('multer');
const path = require('path');

// Konfigurasi tempat penyimpanan file
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/profile_pics');
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadFolder = 'uploads/profile_pics';

        if (req.body.type === 'task') {
            uploadFolder = 'uploads/task';
        } else if (req.body.type === 'notes') {
            uploadFolder = 'uploads/notes';
        }

        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});


const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'));
    }
};

// Inisialisasi Multer
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 },
});

module.exports = upload;

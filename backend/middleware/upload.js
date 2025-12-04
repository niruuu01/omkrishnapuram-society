const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Ensure upload directories exist
const uploadDirs = {
    documents: path.join(__dirname, '../uploads/documents'),
    photos: path.join(__dirname, '../uploads/photos')
};

Object.values(uploadDirs).forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Storage configuration for documents
const documentStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirs.documents);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

// Storage configuration for photos
const photoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirs.photos);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

// File filter for documents
const documentFilter = (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|xls|xlsx|ppt|pptx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only document files (PDF, DOC, XLS, PPT) are allowed'));
    }
};

// File filter for photos
const photoFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only image files (JPG, PNG, GIF) are allowed'));
    }
};

// Multer configurations
const uploadDocument = multer({
    storage: documentStorage,
    fileFilter: documentFilter,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 // 10MB default
    }
});

const uploadPhoto = multer({
    storage: photoStorage,
    fileFilter: photoFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB for photos
    }
});

module.exports = {
    uploadDocument,
    uploadPhoto,
    uploadDirs
};

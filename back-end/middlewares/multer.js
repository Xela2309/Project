const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpeg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'pdp');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const ext = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + ext);
    }
});

module.exports = multer({storage}).single('image');
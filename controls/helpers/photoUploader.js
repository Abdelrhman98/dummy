var multer = require('multer');
const path = require('path');
function uploadImage(imageName) {
    const storage = multer.diskStorage({
        destination: '../../programming/edara/assets',
        filename: function (req, file, cb) {
            cb(null,imageName + path.extname(file.originalname));
        }
    });
    return multer({
        storage: storage,
        limits: { fileSize: 1000000 },
        fileFilter: function (req, file, cb) {
            checkFileType(file, cb);
        }
    }).single('nobtgyaImage');


}

function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

module.exports = uploadImage
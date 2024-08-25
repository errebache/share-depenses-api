const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Load environment variables for flexibility
require('dotenv').config();

const BASE_UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');

// Configuration du stockage pour multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(BASE_UPLOAD_DIR, req.collectionName || 'general');

    // Vérifiez si le dossier existe, sinon créez-le
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Filtre pour accepter seulement les fichiers d'image
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

// Middleware de téléchargement réutilisable avec une limite de taille de fichier de 10MB
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de taille de fichier à 10MB
  fileFilter: fileFilter
});

module.exports = upload;

const path = require('path');

const handleImageUpload = (req, document) => {
  if (req.file) {
    const imagePath = path.join('uploads', req.collectionName || 'general', req.file.filename);
    document.image = imagePath;
  }
};

module.exports = handleImageUpload;

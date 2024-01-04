const {
  listPhotos,
  getPhotoDetails,
  createPhoto,
  updatePhoto,
  deletePhoto
} = require('../../controllers/photo.controller');

const router = require('express').Router();

router.get('/', listPhotos);

router.get('/:photoId', getPhotoDetails);

router.post('/', createPhoto);

router.put('/:photoId', updatePhoto);

router.delete('/:photoId', deletePhoto);

module.exports = router;

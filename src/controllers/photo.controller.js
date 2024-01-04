const mongoose = require('mongoose');
const ErrorHandler = require('../utils/ErrorHandler');
const { getPhotos, getPhoto, createPhoto, updatePhoto, deletePhoto } = require("../queries/photo.queries");

exports.listPhotos = async (req, res, next) => {
  try {
    const photos = await getPhotos();
    res.json(photos);
  } catch (error) {
    next(new ErrorHandler(500, 'INTERNAL_SERVER_ERROR'));
  }
};

exports.getPhotoDetails = async (req, res, next) => {
  try {
    const photo = await getPhoto(req.params.photoId);
    if (!photo) {
      throw new ErrorHandler(404, 'PHOTO_NOT_FOUND');
    }
    res.json(photo);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, 'INVALID_ID_FORMAT'));
    } else {
      next(error);
    }
  }
};

exports.createPhoto = async (req, res, next) => {
  try {
    const newPhoto = await createPhoto(req.body);
    res.status(201).json(newPhoto);
  } catch (error) {
    next(new ErrorHandler(500, 'INTERNAL_SERVER_ERROR'));
  }
};

exports.updatePhoto = async (req, res, next) => {
  try {
    const updatedPhoto = await updatePhoto(req.params.photoId, req.body);
    if (!updatedPhoto) {
      throw new ErrorHandler(404, 'PHOTO_NOT_FOUND');
    }
    res.json(updatedPhoto);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, 'INVALID_ID_FORMAT'));
    } else {
      next(error);
    }
  }
};

exports.deletePhoto = async (req, res, next) => {
  try {
    const deleted = await deletePhoto(req.params.photoId);
    if (!deleted) {
      throw new ErrorHandler(404, 'PHOTO_NOT_FOUND');
    }
    res.status(204).send();
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, 'INVALID_ID_FORMAT'));
    } else {
      next(error);
    }
  }
};

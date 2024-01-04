const Photo = require('../database/models/photo.model');

exports.getPhotos = async () => {
    return await Photo.find().populate('uploadedBy').populate('groupId');
};

exports.getPhoto = async (photoId) => {
    return await Photo.findById(photoId).populate('uploadedBy').populate('groupId');
};

exports.createPhoto = async (photoData) => {
    const photo = new Photo(photoData);
    return await photo.save();
};

exports.updatePhoto = async (photoId, updateData) => {
    return await Photo.findByIdAndUpdate(photoId, updateData, { new: true });
};

exports.deletePhoto = async (photoId) => {
    return await Photo.findByIdAndDelete(photoId);
};

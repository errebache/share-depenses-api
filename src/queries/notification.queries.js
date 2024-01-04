const Notification = require('../database/models/notification.model');

exports.getNotifications = async () => {
    return await Notification.find();
};

exports.getNotification = async (notificationId) => {
    return await Notification.findById(notificationId);
};

exports.createNotification = async (notificationData) => {
    const notification = new Notification(notificationData);
    return await notification.save();
};

exports.updateNotification = async (notificationId, updateData) => {
    return await Notification.findByIdAndUpdate(notificationId, updateData, { new: true });
};

exports.deleteNotification = async (notificationId) => {
    return await Notification.findByIdAndDelete(notificationId);
};

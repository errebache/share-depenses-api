const mongoose = require('mongoose');
const ErrorHandler = require('../utils/ErrorHandler');
const { getNotifications, getNotification, createNotification, updateNotification, deleteNotification } = require("../queries/notification.queries");

exports.updateNotification = async (req, res, next) => {
  try {
    const updatedNotification = await updateNotification(req.params.notificationId, req.body);
    if (!updatedNotification) {
      throw new ErrorHandler(404, 'NOTIFICATION_NOT_FOUND');
    }
    res.json(updatedNotification);
  } catch (error) {
    if (!(error instanceof ErrorHandler)) {
      error = new ErrorHandler(500, error.message || 'INTERNAL_SERVER_ERROR');
    }
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, 'INVALID_ID_FORMAT'));
    } else {
      next(error);
    }
  }
};


exports.listNotifications = async (req, res, next) => {
  try {
    const notifications = await getNotifications();
    res.json(notifications);
  } catch (error) {
    next(new ErrorHandler(500, 'INTERNAL_SERVER_ERROR'));
  }
};

exports.getNotificationDetails = async (req, res, next) => {
  try {
    const notification = await getNotification(req.params.notificationId);
    if (!notification) {
      throw new ErrorHandler(404, 'NOTIFICATION_NOT_FOUND');
    }
    res.json(notification);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, 'INVALID_ID_FORMAT'));
    } else {
      next(error);
    }
  }
};

exports.createNotification = async (req, res, next) => {
  try {
    const newNotification = await createNotification(req.body);
    res.status(201).json(newNotification);
  } catch (error) {
    next(new ErrorHandler(500, 'INTERNAL_SERVER_ERROR'));
  }
};

exports.deleteNotification = async (req, res, next) => {
  try {
    const deleted = await deleteNotification(req.params.notificationId);
    if (!deleted) {
      throw new ErrorHandler(404, 'NOTIFICATION_NOT_FOUND');
    }
    res.status(204).end();
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, 'INVALID_ID_FORMAT'));
    } else {
      next(error);
    }
  }
};

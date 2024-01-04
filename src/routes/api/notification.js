const {
  listNotifications,
  getNotificationDetails,
  createNotification,
  updateNotification,
  deleteNotification
} = require('../../controllers/notification.controller');

const router = require('express').Router();

router.get('/', listNotifications);

router.get('/:notificationId', getNotificationDetails);

router.post('/', createNotification);

router.put('/:notificationId', updateNotification);

router.delete('/:notificationId', deleteNotification);

module.exports = router;

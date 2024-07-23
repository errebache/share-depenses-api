const router = require('express').Router();
const usersRouter = require("./users");
const photoRouter = require("./photo");
const groupRouter = require("./group");
const notificationRouter = require("./notification");
const expenseRouter = require("./expense");
const currencyRouter = require("./currency");
const listRouter = require("./list");
const userAuth = require('./auth');



router.use('/users', usersRouter);
router.use('/currencies', currencyRouter);
router.use('/lists', listRouter);
router.use('/groups', groupRouter);
router.use('/photos', photoRouter);
router.use('/expenses', expenseRouter);
router.use('/notifications', notificationRouter);
router.use('/auth', userAuth);



module.exports = router;
const { userList, userDetails, userDelete, searchUser, emailLinkVerification, initResetPassword, resetPassword, resetPasswordToken, emailValide, usersList } = require('../../controllers/user.controller');


const router = require('express').Router();

router.get('/', userList);
router.get('/search', searchUser);
router.get('/:userId', userDetails);
router.delete('/delete/:userId', userDelete);
router.get("/email-verification/:userId/:token", emailLinkVerification);
// router.post("/email-verification/:userId/:token",emailValide);
router.post("/forgot-password", initResetPassword);
router.get("/reset-password/:userId/:token", resetPasswordToken);
router.post("/reset-password/:userId/:token", resetPassword);

router.get('/usersList/:listId', usersList);

module.exports = router;

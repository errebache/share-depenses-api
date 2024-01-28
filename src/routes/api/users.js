const { userList, userDetails, userCreate, userDelete, searchUser, emailLinkVerification, initResetPassword, resetPassword, resetPasswordToken } = require('../../controllers/user.controller');


const router = require('express').Router();

router.get('/', userList);
router.get('/search', searchUser);
router.get('/:userId', userDetails);
router.delete('/delete/:userId', userDelete);
router.get("/email-verification/:userId/:token", emailLinkVerification);
router.post("/forgot-password", initResetPassword);
router.get("/reset-password/:userId/:token", resetPasswordToken);
router.post("/reset-password/:userId/:token", resetPassword);


module.exports = router;

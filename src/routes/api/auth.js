const { currentUser, userAuth, userRegister, logoutUser } = require('../../controllers/auth.controller');

const router = require('express').Router();

router.post('/', userAuth);
router.get('/current', currentUser);
router.post('/register',userRegister );
router.post('/logout',logoutUser );




module.exports = router;
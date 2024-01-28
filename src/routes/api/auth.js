const { currentUser, userAuth, userRegister } = require('../../controllers/auth.controller');

const router = require('express').Router();

router.post('/', userAuth);
router.get('/current', currentUser);
router.post('/register',userRegister );



module.exports = router;
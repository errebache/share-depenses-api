const { userList, userDetails, userCreate, userDelete, searchUser } = require('../../controllers/user.controller');


const router = require('express').Router();

router.get('/', userList);
router.get('/search', searchUser);
router.get('/:userId', userDetails);
router.post('/', userCreate);
router.delete('/delete/:userId', userDelete);

module.exports = router;

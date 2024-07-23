const { getLists, getListsById, listDetail, addList, deleteList } = require('../../controllers/list.controller');


const router = require('express').Router();

router.get('/', getLists);
router.get('/:listId', getListsById);
router.get('/detail/:listId', listDetail);
router.post('/new',addList);
router.delete('/:listId', deleteList);


module.exports = router;
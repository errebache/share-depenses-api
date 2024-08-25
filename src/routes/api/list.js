const { getLists, getListsById, listDetail, addList, deleteList, editList } = require('../../controllers/list.controller');
const validateRequiredFields = require('../../middleware/validateRequiredFields');


const router = require('express').Router();

router.get('/', getLists);
router.get('/:listId', getListsById);
router.get('/detail/:listId', listDetail);
router.post('/new',
    validateRequiredFields(['name']),
    addList
);
router.patch('/edit/:listId',
    validateRequiredFields(['name']),
    editList
);
router.delete('/:listId', deleteList);


module.exports = router;
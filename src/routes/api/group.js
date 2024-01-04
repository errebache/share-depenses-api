const {
  listGroups,
  getGroupDetails,
  createGroup,
  deleteGroup,
  addGroupMember,
  removeGroupMember,
  groupUpdate
} = require('../../controllers/group.controller');


const router = require('express').Router();

router.get('/', listGroups);
router.get('/:id', getGroupDetails);
router.post('/', createGroup);
router.delete('/:id', deleteGroup);
router.post('/:groupId/members', addGroupMember);
router.delete('/:groupId/members/:userId', removeGroupMember);
router.patch('/:groupId', groupUpdate);
router.post('/:groupId/members/:userId', addGroupMember);





module.exports = router;

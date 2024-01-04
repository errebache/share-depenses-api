const mongoose = require('mongoose');
const ErrorHandler = require('../utils/ErrorHandler');
const { getGroup, getGroups, createGroup, deleteGroup, addMemberToGroup, removeMemberFromGroup, updateGroup } = require("../queries/group.queries");

exports.listGroups = async (req, res, next) => {
  try {
    const groups = await getGroups();
    res.json(groups);
  } catch (error) {
    next(new ErrorHandler(500, 'INTERNAL_SERVER_ERROR'));
  }
};

exports.getGroupDetails = async (req, res, next) => {
  try {
    const group = await getGroup(req.params.id);
    if (!group) {
      throw new ErrorHandler(404, 'GROUP_NOT_FOUND');
    }
    res.json(group);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, 'INVALID_ID_FORMAT'));
    } else {
      next(error);
    }
  }
};

exports.createGroup = async (req, res, next) => {
  try {
    const newGroup = await createGroup(req.body);
    res.status(201).json(newGroup);
  } catch (error) {
    next(new ErrorHandler(500, 'INTERNAL_SERVER_ERROR'));
  }
};

exports.deleteGroup = async (req, res, next) => {
  try {
    const deleted = await deleteGroup(req.params.id);
    if (!deleted) {
      throw new ErrorHandler(404, 'GROUP_NOT_FOUND');
    }
    res.status(204).send();
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, 'INVALID_ID_FORMAT'));
    } else {
      next(error);
    }
  }
};

exports.addGroupMember = async (req, res, next) => {
  try {
    const memberAdded = await addMemberToGroup(req.params.groupId, req.params.userId);
    if (!memberAdded) {
      throw new ErrorHandler(404, 'MEMBER_NOT_ADDED');
    }
    res.status(200).send({ message: "Member added successfully" });
  } catch (error) {
    next(error);
  }
};

exports.removeGroupMember = async (req, res, next) => {
  try {
    const memberRemoved = await removeMemberFromGroup(req.params.groupId, req.params.userId);
    if (!memberRemoved) {
      throw new ErrorHandler(404, 'MEMBER_NOT_REMOVED');
    }
    res.status(200).send({ message: "Member removed successfully" });
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, 'INVALID_ID_FORMAT'));
    } else {
      next(error);
    }
  }
};

exports.groupUpdate = async (req, res, next) => {
  try {
    const updatedGroup = await updateGroup(req.params.groupId, req.body);
    if (!updatedGroup) {
      throw new ErrorHandler(404, 'GROUP_NOT_FOUND');
    }
    res.json(updatedGroup);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, 'INVALID_ID_FORMAT'));
    } else {
      next(error);
    }
  }
};

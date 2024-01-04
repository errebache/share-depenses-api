const mongoose = require('mongoose');
const ErrorHandler = require('../utils/ErrorHandler');
const { getUsers, getUser, createUser, deleteUser, updateUser, searchUser } = require("../queries/user.queries");

exports.userList = async (req, res, next) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        next(new ErrorHandler(500, 'INTERNAL_SERVER_ERROR'));
    }
};

exports.userDetails = async (req, res, next) => {
    try {
        const user = await getUser(req.params.userId);
        if (!user) {
            throw new ErrorHandler(404, 'USER_NOT_FOUND');
        }
        res.json(user);
    } catch (error) {
        if (error instanceof mongoose.CastError) {
            next(new ErrorHandler(400, 'INVALID_ID_FORMAT'));
          } else {
            next(error);
          }
    }
};

exports.userCreate = async (req, res, next) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        next(new ErrorHandler(500, 'INTERNAL_SERVER_ERROR'));
    }
};

exports.userDelete = async (req, res, next) => {
    try {
        const deleted = await deleteUser(req.params.userId);
        if (!deleted) {
            throw new ErrorHandler(404, 'USER_NOT_FOUND');
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

exports.userUpdate = async (req, res, next) => {
    try {
        const updatedUser = await updateUser(req.params.userId, req.body);
        if (!updatedUser) {
            throw new ErrorHandler(404, 'USER_NOT_FOUND');
        }
        res.json(updatedUser);
    } catch (error) {
        if (error instanceof mongoose.CastError) {
            next(new ErrorHandler(400, 'INVALID_ID_FORMAT'));
          } else {
            next(error);
          }
    }
};

exports.searchUser = async (req, res, next) => {
    try {
        const search = req.query.str;
        const users = await searchUser(search);
        res.json(users);
    } catch (error) {
        next(new ErrorHandler(500, 'INTERNAL_SERVER_ERROR'));
    }
};

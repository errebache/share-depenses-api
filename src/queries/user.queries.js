const User = require('../database/models/user.model');

exports.getUsers = async () => {
    return await User.find();
};

exports.getUser = async (userId) => {
    return await User.findById(userId);
};

exports.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

exports.deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

exports.updateUser = async (userId, userData) => {
    return await User.findByIdAndUpdate(userId, userData, { new: true });
};

exports.searchUser = (search) => {
    return User.find({ name: new RegExp(search, 'i')}).exec();
  }
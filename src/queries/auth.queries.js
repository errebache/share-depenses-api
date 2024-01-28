const User = require('../database/models/user.model');



exports.userSave = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

exports.findUserByEmail = (email) => {
    return User.findOne({ email }).exec();
  }

  exports.findByIdAuth = async (userId) => {
    return await User.findById(userId)
    .select("-password -__v")
    .exec();
}

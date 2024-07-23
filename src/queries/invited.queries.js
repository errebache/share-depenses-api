const Invited = require('../database/models/invited.model');


exports.invitedSave = async (userData) => {
    const invited = new Invited(userData);
    return await invited.save();
};

exports.findUserByEmail = (email) => {
    return Invited.findOne({ email }).exec();
}

exports.getAllInviteds = async () => {
    return await Invited.find();
};

exports.getInvitedById = async (userId) => {
    return await Invited.findById(userId);
};

exports.deleteInvited = async (userId) => {
    return await Invited.findByIdAndDelete(userId);
};

exports.updateInvited = async (userId, userData) => {
    return await Invited.findByIdAndUpdate(userId, userData, { new: true });
};

exports.searchInvited = (search) => {
    return Invited.find({ name: new RegExp(search, 'i')}).exec();
}

exports.checkIfEmailExists = async (email) => {
    try {
        const invited = await Invited.findOne({ email: email });
        return !!invited; // Simplified return statement
    } catch (error) {
        console.error('Error checking if email exists:', error);
        throw error;
    }
};
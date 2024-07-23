const TokenModel = require('../database/models/token.model');

exports.tokenSave = async ({ user, token }) => {
    try {
      const newToken = new TokenModel({
        userId: user._id,
        token: token
      });
  
      await newToken.save();
    } catch (error) {
      console.error('Error saving token:', error);
      throw error; // Or handle the error as needed
    }
  };


deleteOneToken = async (token) => {
    try {
        // Find and delete the token
        const result = await TokenModel.deleteOne({ token: token });

        // result.deletedCount indicates the number of documents removed
        return result.deletedCount > 0;
    } catch (error) {
        console.error('Error deleting token:', error);
        throw error; // Or handle the error as needed
    }
};
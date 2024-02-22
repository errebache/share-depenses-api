const User = require('../database/models/user.model');
const TokenModel = require('../database/models/token.model');



exports.userSave = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

exports.findUserByEmail = (email) => {
    return User.findOne({ email }).exec();
  }

//   exports.findByIdAuth = async (userId) => {
//     return await User.findById(userId)
//     .select("-password -__v")
//     .exec();
// }

// exports.findByIdAuth = async (token) => {
//   try {
//     // Trouver le token dans la base de données
//     const tokenDoc = await Token.findOne({ token: token }).exec();
//     if (!tokenDoc) {
//       throw new Error('Token not found');
//     }

//     // Utiliser l'userId du document token pour trouver l'utilisateur
//     const user = await User.findById(tokenDoc.userId)
//       .select("-password -__v")
//       .exec();
//       console.log("-----user findBy Id ");
//       console.log(user);

//     return user;
//   } catch (error) {
//     console.error('Error finding user by token:', error);
//     throw error;
//   }
// };


exports.findByIdAuth = async (userId, token) => {
  try {
    // Vérifier si le token existe et est associé à l'userId
    const tokenExists = await TokenModel.findOne({ userId: userId, token: token }).exec();
    if (!tokenExists) {
      throw new Error('Token not found or does not match the user.');
    }

    // Trouver l'utilisateur par son ID sans le mot de passe
    const user = await User.findById(userId).select("-password -__v").exec();
    return user;
  } catch (error) {
    console.error('Error finding user by ID and token:', error);
    throw error;
  }
};

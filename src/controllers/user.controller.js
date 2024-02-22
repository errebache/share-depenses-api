const mongoose = require("mongoose");
const ErrorHandler = require("../utils/ErrorHandler");
const {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  searchUser,
} = require("../queries/user.queries");
const { findUserByEmail } = require("../queries/auth.queries");
const bcrypt = require("bcrypt");
const emails = require("../_config/emails");
const moment = require("moment");
const { v4: uuid } = require("uuid");

exports.userList = async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    next(new ErrorHandler(500, "INTERNAL_SERVER_ERROR"));
  }
};

exports.userDetails = async (req, res, next) => {
  try {
    const user = await getUser(req.params.userId);
    if (!user) {
      throw new ErrorHandler(404, "USER_NOT_FOUND");
    }
    res.json(user);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, "INVALID_ID_FORMAT"));
    } else {
      next(error);
    }
  }
};

exports.userDelete = async (req, res, next) => {
  try {
    const deleted = await deleteUser(req.params.userId);
    if (!deleted) {
      throw new ErrorHandler(404, "USER_NOT_FOUND");
    }
    res.status(204).send();
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, "INVALID_ID_FORMAT"));
    } else {
      next(error);
    }
  }
};

exports.userUpdate = async (req, res, next) => {
  try {
    const updatedUser = await updateUser(req.params.userId, req.body);
    if (!updatedUser) {
      throw new ErrorHandler(404, "USER_NOT_FOUND");
    }
    res.json(updatedUser);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, "INVALID_ID_FORMAT"));
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
    next(new ErrorHandler(500, "INTERNAL_SERVER_ERROR"));
  }
};

exports.emailLinkVerification = async (req, res, next) => {
  try {
    const { userId, token } = req.params;

    // Validate request parameters
    if (!userId || !token) {
      return res.status(400).send({ message: "Invalid request" });
    }

    const user = await getUser(userId);

    // Check if user exists and token matches
    if (!user || token !== user.emailToken) {
      return res.status(400).send({ message: "Invalid or expired link" });
    }

    // Update user's email verification status
    user.emailVerified = true;
    await user.save();

    if (user && user._id && user.emailToken) {
      const redirectUrl = `http://localhost:5173/validate-email/${user._id}/${user.emailToken}`;
      return res.redirect(redirectUrl);
    }
    // res.status(200).send({
    //   message: "Email vérifié avec succès",
    //   user: user,
    // });
  } catch (error) {
    console.error("Email Verification Error:", error);
    next(new ErrorHandler(500, "Error during email verification"));
  }
};


// exports.emailValide = async (req, res, next) => {
//   try {
//     const { userId, token } = req.params;
//     // Récupérer l'utilisateur avec son ID :
//     const user = await getUser(userId);

//     // Vérifier si l'utilisateur existe et si le token correspond
//     if (!user || token !== user.emailToken) {
//       return res.status(400).send({ message: "Lien invalide ou expiré" });
//     }

//     // Si le token correspond, préparer la réponse pour la validation
//     if (user && user.emailToken === token) {
//       // Envoyer une réponse pour indiquer que la demande est valide
//       // return res.status(200).send({
//       //   message: 'Demande de réinitialisation de mot de passe valide',
//       //   userId: user._id,
//       //   token: user.passwordToken
//       // });

//       return res.redirect(
//         `http://localhost:5173/profil/${user._id}/${user.emailToken}`
//       );
//     } else {
//       return res.status(400).send({ message: "L'utilisateur n'existe pas" });
//     }
//   } catch (e) {
//     console.error("Error resetting password:", e);
//     next(e); // Passer à la gestion des erreurs
//   }
// }

exports.initResetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      // validateEmail est une fonction hypothétique
      return res.status(400).json("Email invalide");
    }

    const user = await findUserByEmail(email);

    // Envoie une réponse générique pour empêcher l'énumération des emails
    const genericResponse = {
      message: "Si l'email existe, un lien de réinitialisation a été envoyé.",
    };
    if (!user) {
      return res.status(200).json(genericResponse);
    }

    user.passwordToken = uuid();
    user.passwordTokenExpiration = moment().add(2, "hours").toDate();

    await user.save();

    try {
      await emails.sendResetPasswordLink({
        to: email,
        host: req.headers.host,
        userId: user._id,
        token: user.passwordToken,
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      // Vous pouvez décider de renvoyer un message d'erreur ici ou non
    }

    return res.status(200).json(genericResponse);
  } catch (e) {
    console.error("Erreur initResetPassword:", e);
    next(e);
  }
};

exports.resetPasswordToken = async (req, res, next) => {
  try {
    const { userId, token } = req.params;
    // Récupérer l'utilisateur avec son ID :
    const user = await getUser(userId);

    // Vérifier si l'utilisateur existe et si le token correspond
    if (!user || token !== user.passwordToken) {
      return res.status(400).send({ message: "Lien invalide ou expiré" });
    }

    // Si le token correspond, préparer la réponse pour la réinitialisation
    if (user && user.passwordToken === token) {
      // Envoyer une réponse pour indiquer que la demande est valide
      // return res.status(200).send({
      //   message: 'Demande de réinitialisation de mot de passe valide',
      //   userId: user._id,
      //   token: user.passwordToken
      // });

      return res.redirect(
        `http://localhost:5173/reset-password/${user._id}/${user.passwordToken}`
      );
    } else {
      return res.status(400).send({ message: "L'utilisateur n'existe pas" });
    }
  } catch (e) {
    console.error("Error resetting password:", e);
    next(e); // Passer à la gestion des erreurs
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { userId, token } = req.params;
    const { password } = req.body;

    const user = await getUser(userId);

    if (!password || !user) {
      return res.status(400).json({ message: "Demande invalide." });
    }

    if (
      user.passwordToken !== token ||
      moment() >= moment(user.passwordTokenExpiration)
    ) {
      return res
        .status(400)
        .json({ message: "Lien de réinitialisation invalide ou expiré." });
    }

    (user.password = await bcrypt.hash(password, 8)),
      (user.passwordToken = null);
    user.passwordTokenExpiration = null;
    await user.save();

    res.status(200).json({ message: "Mot de passe réinitialisé avec succès." });
  } catch (e) {
    console.error("Error resetting password:", e);
    next(e);
  }
};

const {
  findUserByEmail,
  findByIdAuth,
  userSave,
} = require("../queries/auth.queries");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const ErrorHandler = require("../utils/ErrorHandler");
const { key, keyPub } = require("../_config/keys");
const emails = require("../_config/emails");
const { v4: uuid } = require("uuid");
const { checkIfEmailExists } = require("../queries/user.queries");
const { tokenSave } = require("../queries/token.queries");


exports.userRegister = async (req, res, next) => {
  try {
    const { name, email, fullName, profilePhoto, password } = req.body;

    // Await the checkIfEmailExists function
    if (await checkIfEmailExists(email)) {
      return res.status(409).json({ auth: false, message: "Email already exists."});
    }

    let newUser;
    try {
      // Await user creation
      newUser = await userSave({
        name,
        email,
        fullName,
        profilePhoto,
        password: await bcrypt.hash(password, 8),
        emailToken: uuid(),
      });
    } catch (error) {
      // Handle user creation specific errors
      console.error("Error creating user:", error);
      return next(new ErrorHandler(500, "Error creating user"));
    }

    // Email verification logic (assuming this operation is not critical for user creation)
    emails.sendEmailVerification({
      to: newUser.email,
      host: req.hostname,
      userId: newUser._id,
      token: newUser.emailToken,
      useHttps: false,
    });

    res.status(201).json({
      message: "Utilisateur enregistré avec succès",
      user: newUser,
    });
  } catch (error) {
    // General error handling
    next(new ErrorHandler(500, "INTERNAL_SERVER_ERROR"));
  }
};

exports.userAuth = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (user) {
      console.log("user ---- ");
      console.log(user);
      if (bcrypt.compareSync(password, user.password)) {
        const token = jsonwebtoken.sign({}, key, {
          subject: user._id.toString(),
          expiresIn: 3600 * 24 * 30 * 6,
          algorithm: "RS256",
        });
        res.cookie("token", token, { httpOnly: true });
        await tokenSave({ user, token });
        res.json(user);
      } else {
        return res
          .status(401)
          .send({ auth: false, message: "Password not correct" });
      }
    } else {
      return res
          .status(401)
          .send({ auth: false, message: "Email not correct" });
    }
  } catch (error) {
    next(new ErrorHandler(500, "INTERNAL_SERVER_ERROR"));
  }
};


exports.currentUser = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, keyPub, { algorithms: ['RS256'] }); 
      console.log('decodeToken -----');
      console.log(JSON.stringify(decodedToken));
      const currentUser = await findByIdAuth(decodedToken.sub, token); 
      if (currentUser) {
        return res.json(currentUser);
      } else {
        return res.json(null);
      }
    } catch (error) {
      console.error('Error verifying token or finding user:', error);
      return res.status(401).json({ auth: false, message: "Invalid token or user not found." });
    }
  } else {
    return res.status(401).json({ auth: false, message: "No token provided." });
  }
};


exports.logoutUser = async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send({ auth: false, message: "No token provided." });
    }

    res.clearCookie("token");
  
    try {
      let tokenDeleted = await deleteOneToken(token);
      if (!tokenDeleted) {
        return res.status(500).send({ auth: false, message: "Error logging out" });
      }
      return res.send({ success: true, message: "You have been logged out." });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ auth: false, message: "Error logging out" });
    }
};
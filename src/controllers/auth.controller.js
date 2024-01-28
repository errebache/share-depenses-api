const { findUserByEmail, findByIdAuth, userSave } = require("../queries/auth.queries");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const ErrorHandler = require('../utils/ErrorHandler');
const {key, keyPub } = require("../_config/keys");
const emails = require("../_config/emails");
const { v4: uuid } = require('uuid');
const { checkIfEmailExists } = require("../queries/user.queries");


exports.userRegister = async (req, res, next) => {
    try {
        const { name, email, fullName, profilePhoto, password } = req.body;

        // Await the checkIfEmailExists function
        if (await checkIfEmailExists(email)) {
            return res.status(409).send('Email already exists.');
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
            console.error('Error creating user:', error);
            return next(new ErrorHandler(500, 'Error creating user'));
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
            message: 'Utilisateur enregistré avec succès',
            user: newUser,
        });

    } catch (error) {
        // General error handling
        next(new ErrorHandler(500, 'INTERNAL_SERVER_ERROR'));
    }
};

exports.userAuth = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await findUserByEmail(email);
      if (user) {
        console.log('user ---- ')
        console.log(user);
        if (bcrypt.compareSync(password, user.password)) {
            const token = jsonwebtoken.sign({}, key, {
                subject: user._id.toString(),
                expiresIn: 3600 * 24 * 30 * 6,
                algorithm: "RS256"
            })
            res.cookie("token", token, { httpOnly: true });
            res.json(user);
        } else {
            return res.status(401).send({ auth: false, message: 'Email / Password not correct' });
        } 
      }
    } catch (error) {
        next(new ErrorHandler(500, 'INTERNAL_SERVER_ERROR'));
    }
};


exports.currentUser = async (req, res ) => {
    const { token } = req.cookies;
    if (token) {
        try {
            const decodedToken = jsonwebtoken.verify(token, keyPub);
            console.log('decoded', decodedToken);
            const currentUser = await findByIdAuth(decodedToken.sub);
            console.log('currentUser', currentUser);
            if (currentUser) {
                return res.json(currentUser);
            } else {
                return res.json(null);
            }
        } catch (error) {
            return res.json(null);
        }
    } else {
        return res.json(null);
    }
}
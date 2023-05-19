const jwt = require('jsonwebtoken');
const UserModel = require('../model/userModel');

require('dotenv').config();

// Create and save the user into the database and send the user information
exports.signup = async (req, res) => {
    try {
        //check if the user exist before
        const checkUser = await UserModel.findOne({ email: req.body.email })
        if (checkUser) {
            return res.status(400).send({ message: 'User Already Exist', status: 400 });
        }
        user = new UserModel();
        user.first_name = req.body.first_name
        user.last_name = req.body.last_name
        user.email = req.body.email
        user.password = req.body.password

        await user.save()

        delete user.password

        res.status(200).json({
            message: 'Signup successful',
            user: user,
            status: 200
        })
    } catch (err) {
        return res.status(400).send(err.message)
    }
}

// Authenticate the user with the email and password
// then  login the user and return the token
exports.login = async (req, res) => {
    try {
        const userEmail = req.body.email
        const userPassword = req.body.password

        const user = await UserModel.findOne({ email: userEmail });

        if (!user) {
            return res.status(400).send({ message: 'User not found', status: 400 });
        }

        const validate = await user.isValidPassword(userPassword);

        if (!validate) {
            return res.status(400).send({ message: 'Wrong Password', status: 400 });
        }
        //Store the user in the payload of the JWT.
        // You then sign the token with a secrete_key (JWT_SECRET), and send back the token to the user.
        const tokenExpires = '1h'
        const token = jwt.sign({ user }, process.env.JWT_SECRET || 'secret_token', { expiresIn: tokenExpires });
        user.password = undefined;

        return res.status(200).send({ user, token, message: 'Logged in Successfully', status: 200 });
    } catch (error) {
        return done(error);
    }
}
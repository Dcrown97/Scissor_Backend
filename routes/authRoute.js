const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const authController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/register', authController.signup);

authRouter.post('/login', authController.login);

module.exports = authRouter;
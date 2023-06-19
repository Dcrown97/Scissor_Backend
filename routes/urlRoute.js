const express = require('express');
const urlController = require('../controllers/urlController');
const userToken = require('../middleware/userToken')
const authorizationToken = require('../middleware/authorizationToken')
const { limiter, handleRateLimitExceeded } = require('../middleware/rateLimit');

const urlRouter = express.Router();

urlRouter.post('/api/short', authorizationToken, userToken, urlController.shortUrl);
urlRouter.post('/api/custom', authorizationToken, userToken, urlController.custom);
urlRouter.get('/:urlId', limiter, handleRateLimitExceeded, urlController.redirect);
urlRouter.get('/api/analytics', authorizationToken, userToken, urlController.analytics);
urlRouter.get('/api/visit/:id', authorizationToken, userToken, urlController.visit);
urlRouter.get('/api/user/:id', authorizationToken, userToken, urlController.users);

module.exports = urlRouter;
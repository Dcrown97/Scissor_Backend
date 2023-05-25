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

// blogRouter.get('/all_blogs', blogController.getPublishedBlogs);
// blogRouter.get('/single_blog/:id', blogController.getSinglePublishedBlog);
// blogRouter.get('/user_blog', authorizationToken, userToken, blogController.getBlogByAuthor);
// blogRouter.put('/edit_blog/:id', authorizationToken, userToken, blogController.editBlog);
// blogRouter.delete('/delete_blog/:id', authorizationToken, userToken, blogController.deleteBlog);



module.exports = urlRouter;
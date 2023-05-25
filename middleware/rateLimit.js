const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 5 minute
    max: 20, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later."
});

const handleRateLimitExceeded = (req, res, next) => {
    console.log(req.rateLimit.remaining, 'rate')
    if (req.rateLimit.remaining === 0) {
        const customResponse = {
            error: 'Rate limit exceeded. Please try again later.',
            // Add any additional data or fields to the response as needed
        };
        return res.status(429).json(customResponse);
    }
    next();
};

module.exports = {
    limiter,
    handleRateLimitExceeded,
};

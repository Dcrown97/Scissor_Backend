const User = require('../model/userModel')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const userToken = jwt.verify(req.token, process.env.JWT_SECRET)
        // console.log("userToken", userToken)
        const user = await User.findById(userToken.user._id)
        if (!user) {
            throw new Error(
                'Unauthorized'
            )
        }

        // add user to request object
        req.user = user
        next()
    } catch (err) {
        err.source = 'Unauthorized'
        next(err)
    }
}
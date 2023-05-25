const mongoose = require('mongoose')

const UrlSchema = new mongoose.Schema({
    urlId: {
        type: String,
        required: true,
    },
    origUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    customUrl: {
        type: String,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        type: String,
        default: Date.now,
    },
});

module.exports  = mongoose.model('Url', UrlSchema);
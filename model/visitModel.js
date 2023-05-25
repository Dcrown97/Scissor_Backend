const mongoose = require('mongoose')

const VisitSchema = new mongoose.Schema({
    location: {
        type: String,
    },
    ipAddress: {
        type: String,
    },
    device: {
        type: String,
    },
    urlVisitedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'url',
    },
    date: {
        type: String,
        default: Date.now,
    },
});

module.exports = mongoose.model('Visit', VisitSchema);
const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: [true, "Please provide a URL"]
    },

    shortUrl: {
        type: String,
        required: true,
        unique: true
    },

    clicks: {
        type: Number,
        default: 0
    },

    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Link', linkSchema);
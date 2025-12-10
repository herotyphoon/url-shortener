const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
    shortid : {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl : {
        type: String,
        required: true
    },
    clicks : {
        type: Number,
        default: 0
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("shortUrl", shortUrlSchema);
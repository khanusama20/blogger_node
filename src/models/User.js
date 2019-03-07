const mongoose = require('mongoose');

var User = new mongoose.Schema ({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    salt: { type: String },
    locKey: { type: String, required: true },
    temporary: {type: Boolean, default: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, default: null, unique: true },
    sex: { type: String, default: null },
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('User', User);
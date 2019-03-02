const mongoose = require('mongoose');

var SignUp = new mongoose.Schema ({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    salt: { type: String },
    locKey: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, default: null, unique: true },
    sex: { type: String, default: null },
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('SignUp', SignUp);
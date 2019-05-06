const mongoose = require('mongoose');
/// Admin user who can create bugs, analize the report also he can create a new developer profile, access developer profile etc.
var User = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    admin_id: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    public_key: {
        type: String
    },
    private_key: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        default: null,
        unique: true
    },
    gender: {
        type: String,
        default: null
    },
    active: {
        type: Boolean,
        default: true
    },
    profile_picture: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('User', User);
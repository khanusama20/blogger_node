const mongoose = require('mongoose');

var Developer = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    developer_code: {
        type: String,
        unique: true,
        required: true
    },
    private_key: {
        type: String,
        required: true
    },
    temporary: {
        type: Boolean,
        default: true
    },
    public_key: {
        type: String,
        required: true
    },
    email: {
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
    date_of_joining: {
        type: String,
        default: null
    },
    no_of_times_login: {
        type: Number,
        default: 0
    },
    date_of_birth: {
        type: String,
        default: null
    },
    age: {
        type: String,
        default: 0
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Developer', Developer);
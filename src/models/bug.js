const mongoose = require('mongoose');

var Bug = new mongoose.Schema({
    bug_id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    bug_description: {
        type: String
    },
    bug_assign_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer'
    },
    bug_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProgramminLanguage'
    },
    status: {
        type: String,
        default: 'fresh'
    },
    bug_assign_At: {
        type: String,
        default: null
    },
    bug_fixed_At: {
        type: String,
        default: null
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Bug', Bug);
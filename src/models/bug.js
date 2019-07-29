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
    assign_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource'
    },
    bug_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProgramminLanguage'
    },
    priority: {
        type: String,
        default: 'low'
    },
    status: {
        type: String,
        default: 'open'
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
        ref: 'Resource'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource'
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Bug', Bug);
console.log('bug.js loaded successfully');
const mongoose = require('mongoose');

var ProgramminLanguage = new mongoose.Schema({
    language_id: {
        type: String,
        required: true,
        unique: true
    },
    LanguageName: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedDate: {
        type: String
    },
    createdDate: {
        type: String
    }

}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('ProgramminLanguage', ProgramminLanguage);
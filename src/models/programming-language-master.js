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
        ref: 'AdminUser'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminUser'
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
console.log('programming-language-master.js loaded successfully');
const mongoose = require('mongoose');

var ProgramminLanguage = new mongoose.Schema({
    language_id: {
        type: String,
        required: true,
        unique: true
    },
    ProgramminLanguageName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 1
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('ProgramminLanguage', ProgramminLanguage);
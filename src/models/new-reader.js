const mongoose = require('mongoose');

var NewReader = new mongoose.Schema ({
    firstName: {type: String, required: true},
    midName: {type: String, default: null},
    lastName: {type: String, required: true},
    address: {
        area: {type: String, default: null},
        landmark: {type: String, default: null},
        city: {type: String, default: null},
        state: {type: String, default: null},
        pincode: {type: String, default: null}
    },
    dob: {type: String, default: null},
    age: {type: String, default: null},
    gender: {type: String, default: null},
    contact: {type: String, required: true},
    email: {type: String, default: null},
    occupation: {type: String, default: null},
    joiningDate: Date.now(),
    orgnaization: {
        name: {type: String, default: null},
        contact: {type: String, default: null},
        email: {type: String, default: null},
        address: {
            area: {type: String, default: null},
            landmark: {type: String, default: null},
            city: {type: String, default: null},
            state: {type: String, default: null},
            pincode: {type: String, default: null}
        }
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('NewReader', NewReader);
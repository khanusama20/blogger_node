const _mongo_ = require('../../../mongo-connect');
const util = require('../../utils/utility');

// Models
const SignUp = require('../../models/sign-up');

// Mongoose callback convert to promise
const mongoose = require('mongoose');
mongoose.Promise    = require('bluebird');

module.exports = {
    login: async function(parent, args) {
        if (args.email.trim() == "" || args.password.trim() == " ") {
            util.catchError('Mandatory fields are empty', 203);
            return;
        }
        _mongo_.connect();
        let result = [];
        try {
            result = await SignUp.find({$and: [{ email: args.email }, { locKey: args.password }]}).lean();
            if(result.length == 0) {
                throw new Error(); // Activate catch block then I will hit response from catch block
            }
        } catch(err) {
            _mongo_.close();
            if (result.length == 0) {
                util.catchError('Email and password is invalid. Please register first', 408);
            } else {
                util.catchError('Database error', 4);
            }
        }
        
        let _id = result[0]._id.toString();
        delete result[0]._id;
        result = Object.assign({_id: _id}, result[0]);
        console.log(result);
        return result;
    }
}
const _mongo_ = require('../../../mongo-connect');
const util = require('../../utils/utility');
const async = require('async');

import { FIELDS_NOT_FOUND, SERVER_ERROR, DATABASE_ERROR, USER_EXIST } from '../../error-codes'

// Models
const User = require('../../models/User');

// Mongoose callback convert to promise
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {
    signup: async (_A, args) => {
        let errors = [];
        let field_regex = new RegExp('^(firstName|lastName|email|contact)$');
        
        for(let _props in args) {
            if (field_regex.test(_props)) {
                if (args[_props] == "" || args[_props] == null || args[_props] == undefined ) {
                    util.catchError('Mandatory fields are empty', FIELDS_NOT_FOUND);
                }
            }
        }

        /**
         * email should be unique
         */

        let email = args.newUser.email;

        async.series([
            function(callback) {
                _mongo_.connect();

                User.find({"email": email})
                .lean()
                .exec(function(err, user_docs) {
                    if (err) {
                        console.log(err);
                        util.catchError('Database error', DATABASE_ERROR);
                        // return;
                    }

                    if (user_docs.length > 0) {
                        console.log('This email is already used');
                        util.catchError('This email is already used', USER_EXIST);
                        // return;
                    }

                    console.log('Data : ', user_docs);
                    callback(null, null);
                });
            },

            function(callback) {
                
                let user = new User({
                    firstName: args.newUser.firstName,
                    lastName: args.newUser.lastName,
                    salt: util.genSalt(),
                    locKey: util.generatePassword(),
                    email: args.newUser.email,
                    contact: args.newUser.contact,
                    sex: args.newUser.sex
                });

                user.save(function(_error, _new_user) {
                    if(_error) {
                        console.log(_error);
                        util.catchError('Database error', DATABASE_ERROR);
                        // return;
                    }
                    callback(null, _new_user);
                });
            },

        ], function(error, result) {
            console.log('User created  ' , result[0]);
            _mongo_.close();
            return result[0]
        });
    }
}
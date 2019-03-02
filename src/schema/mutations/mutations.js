const _mongo_ = require('../../../mongo-connect');
const util = require('../../utils/utility');

// Models
const SignUp = require('../../models/sign-up');

// Mongoose callback convert to promise
const mongoose = require('mongoose');
mongoose.Promise    = require('bluebird');

module.exports = {
    signup: async function(_A, args) {
        let errors = [];
        let field_regex = new RegExp('^(firstName|lastName|email|contact)$');
        
        for(let _props in args) {
            if (field_regex.test(_props)) {
                if (args[_props] == "" || args[_props] == null || args[_props] == undefined ) {
                    util.catchError('Mandatory fields are empty', 203);
                }
            }
        }

        let _new_user = {
            firstName: args.firstName,
            lastName: args.lastName,
            salt: util.genSalt(),
            locKey: util.generatePassword(),
            email: args.email,
            contact: args.contact,
            sex: args.sex
        }

        _mongo_.connect();
        let signup = new SignUp(_new_user);
        let new_doc = await signup.save();
        
        // memory released
        _new_user = signup = undefined;
        console.log(new_doc);
        _mongo_.close();
        return new_doc;
    },
    createNewReader: (_A, args) => {
        // console.log(args.formData);
        // return args.formData;

        console.log(args);
        return args.formData;
        
    },
    createNewOrgnaization: (_A, args) => {
        console.log('Data Recived : ' , args.formData);
        return args.formData;
    },
    addYourAddress: (_A, args) => {
        console.log('args : ' ,args);
        return args;
    }
}
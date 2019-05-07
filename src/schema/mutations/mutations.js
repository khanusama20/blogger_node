const _modules_ = require('../../../modules');
const mongoose = _modules_.mongoose;
mongoose.Promise = require('bluebird');

let log = _modules_.log.log;
let utils = _modules_.util;

let ERROR_CODE = _modules_.ERR_CODE

module.exports = {
    createNewAdminUser: async(_A, args) => {
        log.info("mutation => createNewAdminUser");

        let AdminUser = _modules_.User;

        let public_key = _modules_.util.genSalt();
        let random_password = _modules_.util.generatePassword();
        let private_key = utils.hash(random_password, public_key);

        log.info('PUBLIC KEY : ' + public_key);
        log.info('RANDOM PASSWORD : ' + random_password);
        log.info('PRIVATE KEY : ' + private_key);

        let body = args.formData;

        let admin_user = new AdminUser({
            firstName: body.firstName,
            lastName: body.lastName,
            admin_id: body.admin_id,
            public_key: public_key,
            private_key: private_key,
            userName: body.userName,
            contact: body.contact,
            gender: body.gender,
            active: body.active,
            profile_picture: body.profile_picture,
            state: body.state,
            city: body.city
        });

        let result = {}
        try {
            _modules_._mongo_.connect();
            result = await admin_user.save();
            _modules_._mongo_.close();

            if (result === null || result === "") {
                log.info('Sorry! admin creation process failed');
                return utils.sendResponse(200, false, 'Sorry! admin creation process failed', ERROR_CODE.USER_FAILED, result)
            } else {
                log.info('Admin created successfully', result);
                result = { adminUser: result };
                return utils.sendResponse(200, false, 'Admin created successfully', ERROR_CODE.FOUND, result);
            }
        } catch(err) {
            _modules_._mongo_.close();
            log.error(err);
            return utils.sendResponse(200, false, 'Database Error', ERROR_CODE.DATABASE_ERROR, result);
        }
    },
    createNewDeveloper: async (_A, args) => {
        
        let Developer = _modules_.developer;
        let developer_age = 23;


        /**
         * 
         */
        _modules_._mongo_.connect();            // create a connection
        log.info("Connected to MongoDatabase");
        let new_developer = new Developer({
            firstName: args.developer.firstName,
            lastName: args.developer.lastName,
            developer_code: args.developer.developer_code,
            private_key: _modules_.util.generatePassword(),
            public_key: _modules_.util.genSalt(),
            email: args.developer.email,
            contact: args.developer.contact,
            gender: args.developer.gender,
            active: args.developer.active,
            profile_picture: args.developer.profile_picture,
            state: args.developer.state,
            city: args.developer.city,
            date_of_joining: args.developer.date_of_joining,
            date_of_birth: args.developer.date_of_birth,
            age: developer_age,
        });


        let result;
        try {
            result = await new_developer.save();
            if (result === null || result === "" || result.length === 0 || Object.keys(result).length === 0) {
                log.info('Sorry! process failed', result);
            } else {
                _modules_._mongo_.close();            // create a connection
                log.info("Connection closed successfully");
                return result;
            }
        } catch(Exception) {
            log.error('Exception ' , result);
        }    
    }   
}
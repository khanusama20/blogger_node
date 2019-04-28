const _modules_ = require('../../../modules');
const mongoose = _modules_.mongoose;
mongoose.Promise = require('bluebird');

let log = _modules_.log.log

module.exports = {
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
const _modules_ = require('../../../modules');
const mongoose = _modules_.mongoose;
mongoose.Promise = require('bluebird');

let log = _modules_.log.log;
let utils = _modules_.util;

let ERROR_CODE = _modules_.ERR_CODE

module.exports = {
    createNewAdminUser: async(_A, args) => {
        log.info("mutation => createNewAdminUser");
        log.info("mutations.js");
        let body = args.formData;

        if (utils.isValidString(body.firstName) === false || utils.isValidString(body.lastName) === false) {
            log.error('The name should not contain numbers and special characters');
            return utils.sendResponse(200, false, 'The name should not contain numbers and special characters', ERROR_CODE.INVALID_INPUT, {});
        } else if (utils.validateMobileNo(body.contact) === false) {
            log.error('The contact no. is invalid');
            return utils.sendResponse(200, false, 'The contact no. is invalid', ERROR_CODE.INVALID_INPUT, {});
        } else {
            let AdminUser = _modules_.User;

            let public_key = _modules_.util.genSalt();
            let random_password = _modules_.util.generatePassword();
            let private_key = utils.hash(random_password, public_key);

            log.info('PUBLIC KEY : ' + public_key);
            log.info('RANDOM PASSWORD : ' + random_password);
            log.info('PRIVATE KEY : ' + private_key);

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

            let result = {};
            try {
                _modules_._mongo_.connect();
                result = await admin_user.save();
                _modules_._mongo_.close();

                if (result === null || result === "") {
                    log.info('Sorry! admin creation process failed');
                    return utils.sendResponse(200, false, 'Sorry! admin creation process failed', ERROR_CODE.USER_FAILED, result);
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
        }
    },
    createNewDeveloper: async (_A, args) => {

        log.info("mutation => createNewDeveloper");
        log.info("mutations.js");
        
        let Developer = _modules_.developer;
        let developer_age = 23;

        let mandatory_fields = new RegExp('^(firstName|lastName|email|contact|gender|date_of_birth)$');
        
        for(let fields_name in  args.developer) {
            if (mandatory_fields.test(fields_name)) {
                if (args.developer[fields_name] === "" || args.developer[fields_name] === null || args.developer[fields_name] === undefined) {
                    return utils.sendResponse(200, false, 'The mandatory fields are not found', ERROR_CODE.FIELDS_NOT_FOUND, {});
                }
            }
        }

        if (utils.isValidString(args.developer.firstName) === false || utils.isValidString(args.developer.lastName) === false) {
            log.error('The name should not contain numbers and special characters');
            return utils.sendResponse(200, false, 'The name should not contain numbers and special characters', ERROR_CODE.INVALID_INPUT, {});
        } else if (utils.validateMobileNo(args.developer.contact) === false) {
            log.error('The contact no. is invalid');
            return utils.sendResponse(200, false, 'The contact no. is invalid', ERROR_CODE.INVALID_INPUT, {});
        } else {

            let public_key = _modules_.util.genSalt();
            let random_password = _modules_.util.generatePassword();
            let private_key = utils.hash(random_password, public_key);

            log.info('PUBLIC KEY : ' + public_key);
            log.info('RANDOM PASSWORD : ' + random_password);
            log.info('PRIVATE KEY : ' + private_key);

            let gender = args.developer.gender === "" || args.developer.gender === null || args.developer.gender === undefined ? "" : args.developer.gender.toLowerCase();
            if (gender === 'male' || gender === 'female') {} else {
                log.error('Gender formate is incorrect');
                return utils.sendResponse(200, false, 'Gender formate is incorrect', ERROR_CODE.INVALID_INPUT, {});
            }

            if (args.developer.active !== "true" && args.developer.active !== "false") {
                log.error('Invalid type, we accept only boolean\'s');
                return utils.sendResponse(200, false, 'Invalid type, we accept only boolean\'s', ERROR_CODE.INVALID_INPUT, {});
            }

            let admin_result = null;

            admin_result = {
                "contact" : "7208204758", 
                "firstName" : "Mubeen", 
                "lastName" : "Khan", 
                "admin_id" : "CX20A", 
                "_id": "5cd12f48322f1f29a82adbd6"
            };

            
            // try {
            //     // await _modules_._mongo_.connect();
            //     let admin_res = await utils.authenticatAdminUser(args.developer.adminId);
            //     _modules_._mongo_.close();
            //     if (admin_res.err_code === -1) {
            //         admin_result = admin_res.msg;
            //     }
            // } catch (DatabaseException) {
            //     log.error('Database Error : ' , DatabaseException);
            //     return utils.sendResponse(200, false, 'Database Error', ERROR_CODE.DATABASE_ERROR, result);
            // }

            // log.info('Admin Authorized : ' , admin_result);
    
            let new_developer = new Developer({
                firstName: args.developer.firstName,
                lastName: args.developer.lastName,
                developer_code: args.developer.developer_code,
                private_key: private_key,
                public_key: public_key,
                email: args.developer.email,
                contact: args.developer.contact,
                gender: gender,
                active: args.developer.active === "true" ? true : false,
                profile_picture: args.developer.profile_picture,
                state: args.developer.state,
                city: args.developer.city,
                date_of_joining: args.developer.date_of_joining,
                date_of_birth: args.developer.date_of_birth,
                age: developer_age,
                // createdBy: admin_result._id,
                // updatedBy: admin_result._id
                createdBy: '5cd12f48322f1f29a82adbd6',
                updatedBy: '5cd12f48322f1f29a82adbd6'
            });

            let result;
            try {
                await _modules_._mongo_.connect();
                result = await new_developer.save();
                _modules_._mongo_.close();  
                if (result === null || result === "" || result.length === 0 || Object.keys(result).length === 0) {
                    log.info('Sorry! developer is not added');
                    return utils.sendResponse(200, false, 'Sorry! developer is not added', ERROR_CODE.USER_FAILED, result)
                } else {
                    log.info('Developer added successfully');
                    
                    let createdBy, updatedBy;

                    if (result.createdBy.toString() === result.updatedBy.toString()) {
                        createdBy = {
                            _id: admin_result._id.toString(),
                            firstName: admin_result.firstName,
                            lastName: admin_result.lastName,
                            admin_id: admin_result.admin_id,
                            contact: admin_result.contact
                        }
                        updatedBy = {
                            _id: admin_result._id.toString(),
                            firstName: admin_result.firstName,
                            lastName: admin_result.lastName,
                            admin_id: admin_result.admin_id,
                            contact: admin_result.contact
                        }
                    }

                    let new_result = { 
                        developer: {
                            contact: result.contact,
                            gender: result.gender,
                            active: result.active,
                            profile_picture: result.profile_picture,
                            state: result.state,
                            city: result.city,
                            date_of_joining: result.date_of_joining,
                            no_of_times_login: result.no_of_times_login,
                            date_of_birth: result.date_of_birth,
                            age: result.age,
                            _id: result._id,
                            firstName: result.firstName,
                            lastName: result.lastName,
                            developer_code: result.developer_code,
                            email: result.email,
                            createdBy: createdBy,
                            updatedBy: updatedBy,
                            createdAt: result.createdAt,
                            updatedAt: result.updatedAt 
                        } 
                    }    
                    
                    return utils.sendResponse(200, false, 'Developer added successfully', ERROR_CODE.FOUND, new_result);
                }
            } catch(Exception) {
                _modules_._mongo_.close();
                log.error(Exception);
                return utils.sendResponse(200, false, 'Database Error', ERROR_CODE.DATABASE_ERROR, result);
            }    
        }    
    }   
}
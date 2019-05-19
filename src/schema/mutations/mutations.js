const _modules_ = require('../../../modules');
const mongoose = _modules_.mongoose;
mongoose.Promise = require('bluebird');

let log = _modules_.log.log;
let utils = _modules_.util;

let ERROR_CODE = _modules_.ERR_CODE;

let ObjectId = mongoose.Types.ObjectId;

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
                    return utils.sendResponse(200, true, 'Admin created successfully', ERROR_CODE.FOUND, result);
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
            try {
                let admin_res = await utils.authenticatAdminUser(args.developer.adminId);
                if (admin_res.err_code === -1) {
                    admin_result = admin_res.msg;
                } else {
                    log.info('Sorry! the user is not register yet');
                    return utils.sendResponse(200, false, 'Sorry! the user is not register yet', ERROR_CODE.USER_FAILED, {});
                }
            } catch (DatabaseException) {
                log.error('Database Error : ' , DatabaseException);
                return utils.sendResponse(200, false, 'Database Error', ERROR_CODE.DATABASE_ERROR, {});
            }

            log.info('Admin Authorized : ' , admin_result);
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
                createdBy: admin_result._id,
                updatedBy: admin_result._id
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
                        createdBy = utils.filterUserInfo(admin_result);
                        updatedBy = utils.filterUserInfo(admin_result);
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
                    
                    return utils.sendResponse(200, true, 'Developer added successfully', ERROR_CODE.FOUND, new_result);
                }
            } catch(Exception) {
                _modules_._mongo_.close();
                log.error(Exception);
                return utils.sendResponse(200, false, 'Database Error', ERROR_CODE.DATABASE_ERROR, result);
            }    
        }    
    },
    createNewLanguage: async function(A, args) {

        log.info("mutation => createNewLanguage");
        log.info("mutations.js");

        let form_body = args.formdata;

        // checking mandatory fields
        let mandatory_fields = new RegExp('^(LanguageName|adminId)$');
        for(let props in form_body) {
            if (mandatory_fields.test(props) === true && !Boolean(form_body[props])) {
                log.info('Not found field: ' + props);
                return utils.sendResponse(200, false, 'The mandatory fields are missing or not found', ERROR_CODE.FIELDS_NOT_FOUND, {});
            }
        }

        // fields validation
        if (parseInt(form_body.status) !== 1 && parseInt(form_body.status) !== 0) {
            return utils.sendResponse(200, false, 'Invalid input', ERROR_CODE.INVALID_INPUT, {});
        }

        if (!Boolean(form_body.language_id)) {
            form_body.language_id = 'L'+utils.randomId();
        }
        
        // User validation
        let admin_result;
        try {
            admin_result = await utils.authenticatAdminUser(form_body.adminId);
            if (admin_result.err_code === 10) {
                log.info('Sorry! the user is not register yet');
                return utils.sendResponse(200, false, 'Sorry! the user is not register yet', ERROR_CODE.USER_FAILED, {});
            }
        } catch(DatabaseError) {
            log.error('Database Error : ' , DatabaseError);
            return utils.sendResponse(200, false, 'Database Error', ERROR_CODE.DATABASE_ERROR, {});
        }

        log.info('Admin Info : ', admin_result);

        let new_langauge = new _modules_.languageSchema({
            language_id: form_body.language_id,
            LanguageName: form_body.LanguageName,
            status: form_body.status,
            createdBy: admin_result.msg._id,
            updatedBy: admin_result.msg._id,
            updatedDate: Date.now(),
            createdDate: Date.now(),
        });
        
        try {
            _modules_._mongo_.connect();
            let result = await new_langauge.save();
            _modules_._mongo_.close();
            if (result == null || result === "") {
                log.info('Sorry! language is not added', result);
                return utils.sendResponse(200, true, 'Sorry! language is not added', ERROR_CODE.NOT_FOUND, result);
            } else {
                log.info('New language is created successfully', result);

                let createdBy, updatedBy;

                admin_result = admin_result.msg;

                createdBy = utils.filterUserInfo(admin_result);
                updatedBy = utils.filterUserInfo(admin_result);

                let new_result = {
                    language: {
                        language_id: result.language_id,
                        LanguageName: result.LanguageName,
                        status: result.status,
                        createdBy: createdBy,
                        updatedBy: updatedBy,
                        updatedDate: result.updatedDate,
                        createdDate: result.createdDate
                    }
                }
                return utils.sendResponse(200, true, 'New language is created successfully', ERROR_CODE.FOUND, new_result);
            }
        } catch(DatabaseError) {
            _modules_._mongo_.close();
            log.error(DatabaseError);
            return utils.sendResponse(200, false, 'Database Error', ERROR_CODE.DATABASE_ERROR, {});
        }
    },
    updateExistingLanguage: async function(A, args) {

        log.info("mutation => updateExistingLanguage");
        log.info("mutations.js");

        let form_body = args.formdata;

        // checking mandatory fields
        let mandatory_fields = new RegExp('^(LanguageName|adminId)$');
        for(let props in form_body) {
            if (mandatory_fields.test(props) === true && !Boolean(form_body[props])) {
                log.info('Not found field: ' + props);
                return utils.sendResponse(200, false, 'The mandatory fields are missing or not found', ERROR_CODE.FIELDS_NOT_FOUND, {});
            }
        }

        // fields validation
        if (parseInt(form_body.status) !== 1 && parseInt(form_body.status) !== 0) {
            return utils.sendResponse(200, false, 'Invalid input', ERROR_CODE.INVALID_INPUT, {});
        }

        // User validation
        let admin_result;
        try {
            admin_result = await utils.authenticatAdminUser(form_body.adminId);
            if (admin_result.err_code === 10) {
                log.info('Sorry! the user is not register yet');
                return utils.sendResponse(200, false, 'Sorry! the user is not register yet', ERROR_CODE.USER_FAILED, {});
            }
        } catch(DatabaseError) {
            log.error('Database Error : ' , DatabaseError);
            return utils.sendResponse(200, false, 'Database Error', ERROR_CODE.DATABASE_ERROR, {});
        }

        let update_language = {
            LanguageName: form_body.LanguageName,
            status: form_body.status,
            updatedBy: admin_result.msg._id,
            updatedDate: Date.now()
        }

        let query = form_body._id.length > 20 ? { _id: ObjectId(form_body._id) } : { language_id: form_body._id}
        try {
            _modules_._mongo_.connect();
            let result = await _modules_.languageSchema.findOneAndUpdate(query, update_language, {new: true});
            _modules_._mongo_.close();
            if (result == null || result === "") {
                log.info('Sorry! record is not updated', result);
                return utils.sendResponse(200, true, 'Sorry! record is not updated', ERROR_CODE.NOT_FOUND, result);
            } else {
                let createdBy, updatedBy, created_by_result;

                admin_result = admin_result.msg;
                
                if (result.createdBy.toString() === result.updatedBy.toString()) {
                    createdBy = utils.filterUserInfo(admin_result);
                    updatedBy = utils.filterUserInfo(admin_result);

                } else {
                    updatedBy = utils.filterUserInfo(admin_result);
                    _modules_._mongo_.connect();
                    created_by_result = await _modules_.User.find({_id: ObjectId(result.createdBy)});
                    _modules_._mongo_.close();
                    if (created_by_result.length > 0) {
                        createdBy = utils.filterUserInfo(created_by_result);
                    } else {
                        createdBy = null
                    }
                }

                let new_result = {
                    language: {
                        language_id: result.language_id,
                        LanguageName: result.LanguageName,
                        status: result.status,
                        createdBy: createdBy,
                        updatedBy: updatedBy,
                        updatedDate: result.updatedDate,
                        createdDate: result.createdDate
                    }
                }
                return utils.sendResponse(200, true, 'The record is updated successfully', ERROR_CODE.FOUND, new_result);
            }
        } catch(DatabaseError) {
            _modules_._mongo_.close();
            log.error(DatabaseError);
            return utils.sendResponse(200, false, 'Database Error', ERROR_CODE.DATABASE_ERROR, {});
        }
    }  
}
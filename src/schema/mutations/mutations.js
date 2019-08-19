let Schema = require('../../../modules');
let appConfig = require('../../config/app_config');
let utils = require('../../utils/utility');
let log = require('../../config/log_config');

let _mongo_ = require('../../../mongo-connect');
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let errcode = appConfig.errcodes;
let errmessage = appConfig.errmessages;
let ObjectId = mongoose.Types.ObjectId;


module.exports = {
    createNewAdminUser: async(_A, args) => {
        log.info("mutation => createNewAdminUser");
        log.info("mutations.js");
        let body = args.formData;

        if (utils.isValidString(body.firstName) === false || utils.isValidString(body.lastName) === false) {
            log.error('The name should not contain numbers and special characters');
            return utils.sendResponse(200, false, 'The name should not contain numbers and special characters', errcode.INVALID_INPUT, {});
        } else if (utils.validateMobileNo(body.contact) === false) {
            log.error('The contact no. is invalid');
            return utils.sendResponse(200, false, 'The contact no. is invalid', errcode.INVALID_INPUT, {});
        } else {
            let AdminUser = Schema.User;

            let public_key = utils.genSalt();
            let random_password = utils.generatePassword();
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
                _mongo_.connect();
                result = await admin_user.save();
                _mongo_.close();

                if (result === null || result === "") {
                    log.info('Sorry! admin creation process failed');
                    return utils.sendResponse(200, false, 'Sorry! admin creation process failed', errcode.USER_FAILED, result);
                } else {
                    log.info('Admin created successfully', result);
                    result = { adminUser: result };
                    return utils.sendResponse(200, true, 'Admin created successfully', errcode.FOUND, result);
                }
            } catch (err) {
                _mongo_.close();
                log.error(err);
                return utils.sendResponse(200, false, 'Database Error', errcode.DATABASE_ERROR, result);
            }
        }
    },
    createNewResource: async(_A, args) => {

        log.info("mutation => createNewDeveloper");
        log.info("mutations.js");

        let Developer = Schema.resource; // Developer is means as resource
        let developer_age = 23;

        let mandatory_fields = new RegExp('^(firstName|lastName|email|contact|gender|date_of_birth)$');

        for (let fields_name in args.resource) {
            if (mandatory_fields.test(fields_name)) {
                if (args.resource[fields_name] === "" || args.resource[fields_name] === null || args.resource[fields_name] === undefined) {
                    return utils.sendResponse(200, false, 'The mandatory fields are not found', errcode.FIELDS_NOT_FOUND, {});
                }
            }
        }

        let resource_type_options = new RegExp('^(developer|tester)$');
        if (resource_type_options.test(args.resource.resource_type)) {
            log.info('Unidentified the resource type');
            return utils.sendResponse(200, false, 'Unidentified the resource type', errcode.INVALID_INPUT, {});
        }

        let employee_status_regex = new RegExp('^(fresher|experienced)$');
        if (employee_status_regex.test(args.resource.employee_status)) {
            log.info('Unidentified the employee status');
            return utils.sendResponse(200, false, 'Unidentified the employee status', errcode.INVALID_INPUT, {});
        }

        if (utils.isValidString(args.resource.firstName) === false || utils.isValidString(args.resource.lastName) === false) {
            log.error('The name should not contain numbers and special characters');
            return utils.sendResponse(200, false, 'The name should not contain numbers and special characters', errcode.INVALID_INPUT, {});
        } else if (utils.validateMobileNo(args.resource.contact) === false) {
            log.error('The contact no. is invalid');
            return utils.sendResponse(200, false, 'The contact no. is invalid', errcode.INVALID_INPUT, {});
        } else {

            let public_key = utils.genSalt();
            let random_password = utils.generatePassword();
            let private_key = utils.hash(random_password, public_key);

            log.info('PUBLIC KEY : ' + public_key);
            log.info('RANDOM PASSWORD : ' + random_password);
            log.info('PRIVATE KEY : ' + private_key);

            let gender = args.resource.gender === "" || args.resource.gender === null || args.resource.gender === undefined ? "" : args.resource.gender.toLowerCase();
            if (gender === 'male' || gender === 'female') {} else {
                log.error('Gender formate is incorrect');
                return utils.sendResponse(200, false, 'Gender formate is incorrect', errcode.INVALID_INPUT, {});
            }

            if (args.resource.active !== "true" && args.resource.active !== "false") {
                log.error('Invalid type, we accept only boolean\'s');
                return utils.sendResponse(200, false, 'Invalid type, we accept only boolean\'s', errcode.INVALID_INPUT, {});
            }

            let admin_result = null;
            try {
                let admin_res = await utils.authenticatAdminUser(args.resource.adminId);
                if (admin_res.err_code === -1) {
                    admin_result = admin_res.msg;
                } else {
                    log.info('Sorry! the user is not register yet');
                    return utils.sendResponse(200, false, 'Sorry! the user is not register yet', errcode.USER_FAILED, {});
                }
            } catch (DatabaseException) {
                log.error('Database Error : ', DatabaseException);
                return utils.sendResponse(200, false, 'Database Error', errcode.DATABASE_ERROR, {});
            }

            log.info('Admin Authorized : ', admin_result);
            let new_developer = new Developer({
                firstName: args.resource.firstName,
                lastName: args.resource.lastName,
                resource_id: args.resource.resource_id,
                private_key: private_key,
                public_key: public_key,
                email: args.resource.email,
                contact: args.resource.contact,
                gender: gender,
                active: args.resource.active === "true" ? true : false,
                profile_picture: args.resource.profile_picture,
                employee_status: args.resource.employee_status,
                resource_type: args.resource.resource_type,
                state: args.resource.state,
                city: args.resource.city,
                date_of_joining: args.resource.date_of_joining,
                date_of_birth: args.resource.date_of_birth,
                age: developer_age,
                createdBy: admin_result._id,
                updatedBy: admin_result._id
            });

            let result;
            try {
                await _mongo_.connect();
                result = await new_developer.save();
                _mongo_.close();
                if (result === null || result === "" || result.length === 0 || Object.keys(result).length === 0) {
                    log.info('Sorry! developer is not added');
                    return utils.sendResponse(200, false, 'Sorry! developer is not added', errcode.USER_FAILED, result)
                } else {
                    log.info('Developer added successfully');

                    let createdBy, updatedBy;

                    if (result.createdBy.toString() === result.updatedBy.toString()) {
                        createdBy = utils.filterUserInfo(admin_result);
                        updatedBy = utils.filterUserInfo(admin_result);
                    }

                    let new_result = {
                        resource: {
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
                            resource_id: result.resource_id,
                            email: result.email,
                            employee_status: result.employee_status,
                            resource_type: result.resource_type,
                            createdBy: createdBy,
                            updatedBy: updatedBy,
                            createdAt: result.createdAt,
                            updatedAt: result.updatedAt
                        }
                    }

                    return utils.sendResponse(200, true, 'Developer added successfully', errcode.FOUND, new_result);
                }
            } catch (Exception) {
                _mongo_.close();
                log.error(Exception);
                return utils.sendResponse(200, false, 'Database Error', errcode.DATABASE_ERROR, result);
            }
        }
    },
    createNewLanguage: async function(A, args) {

        log.info("mutation => createNewLanguage");
        log.info("mutations.js");

        let form_body = args.formdata;

        // checking mandatory fields
        let mandatory_fields = new RegExp('^(LanguageName|adminId)$');
        for (let props in form_body) {
            if (mandatory_fields.test(props) === true && !Boolean(form_body[props])) {
                log.info('Not found field: ' + props);
                return utils.sendResponse(200, false, 'The mandatory fields are missing or not found', errcode.FIELDS_NOT_FOUND, {});
            }
        }

        // fields validation
        if (parseInt(form_body.status) !== 1 && parseInt(form_body.status) !== 0) {
            return utils.sendResponse(200, false, 'Invalid input', errcode.INVALID_INPUT, {});
        }

        if (!Boolean(form_body.language_id)) {
            form_body.language_id = 'L' + utils.randomId();
        }

        // User validation
        let admin_result;
        try {
            admin_result = await utils.authenticatAdminUser(form_body.adminId);
            if (admin_result.err_code === 10) {
                log.info('Sorry! the user is not register yet');
                return utils.sendResponse(200, false, 'Sorry! the user is not register yet', errcode.USER_FAILED, {});
            }
        } catch (DatabaseError) {
            log.error('Database Error : ', DatabaseError);
            return utils.sendResponse(200, false, 'Database Error', errcode.DATABASE_ERROR, {});
        }

        log.info('Admin Info : ', admin_result);

        let new_langauge = new Schema.languageSchema({
            language_id: form_body.language_id,
            LanguageName: form_body.LanguageName,
            status: form_body.status,
            createdBy: admin_result.msg._id,
            updatedBy: admin_result.msg._id,
            updatedDate: Date.now(),
            createdDate: Date.now(),
        });

        try {
            _mongo_.connect();
            let result = await new_langauge.save();
            _mongo_.close();
            if (result == null || result === "") {
                log.info('Sorry! language is not added', result);
                return utils.sendResponse(200, true, 'Sorry! language is not added', errcode.NOT_FOUND, result);
            } else {
                log.info('New language is created successfully', result);

                let createdBy, updatedBy;

                admin_result = admin_result.msg;

                createdBy = utils.filterUserInfo(admin_result);
                updatedBy = utils.filterUserInfo(admin_result);

                let new_result = {
                    language: {
                        _id: result._id,
                        language_id: result.language_id,
                        LanguageName: result.LanguageName,
                        status: result.status,
                        createdBy: createdBy,
                        updatedBy: updatedBy,
                        updatedDate: result.updatedDate,
                        createdDate: result.createdDate
                    }
                }
                return utils.sendResponse(200, true, 'New language is created successfully', errcode.FOUND, new_result);
            }
        } catch (DatabaseError) {
            _mongo_.close();
            log.error(DatabaseError);
            return utils.sendResponse(200, false, 'Database Error', errcode.DATABASE_ERROR, {});
        }
    },
    updateExistingLanguage: async function(A, args) {

        log.info("mutation => updateExistingLanguage");
        log.info("mutations.js");

        let form_body = args.formdata;

        // checking mandatory fields
        let mandatory_fields = new RegExp('^(LanguageName|adminId)$');
        for (let props in form_body) {
            if (mandatory_fields.test(props) === true && !Boolean(form_body[props])) {
                log.info('Not found field: ' + props);
                return utils.sendResponse(200, false, 'The mandatory fields are missing or not found', errcode.FIELDS_NOT_FOUND, {});
            }
        }

        // fields validation
        if (parseInt(form_body.status) !== 1 && parseInt(form_body.status) !== 0) {
            return utils.sendResponse(200, false, 'Invalid input', errcode.INVALID_INPUT, {});
        }

        // User validation
        let admin_result;
        try {
            admin_result = await utils.authenticatAdminUser(form_body.adminId);
            if (admin_result.err_code === 10) {
                log.info('Sorry! the user is not register yet');
                return utils.sendResponse(200, false, 'Sorry! the user is not register yet', errcode.USER_FAILED, {});
            }
        } catch (DatabaseError) {
            log.error('Database Error : ', DatabaseError);
            return utils.sendResponse(200, false, 'Database Error', errcode.DATABASE_ERROR, {});
        }

        let update_language = {
            LanguageName: form_body.LanguageName,
            status: form_body.status,
            updatedBy: admin_result.msg._id,
            updatedDate: Date.now()
        }

        let query = form_body._id.length > 20 ? { _id: ObjectId(form_body._id) } : { language_id: form_body._id }
        try {
            _mongo_.connect();
            let result = await Schema.languageSchema.findOneAndUpdate(query, update_language, { new: true });
            _mongo_.close();
            if (result == null || result === "") {
                log.info('Sorry! record is not updated', result);
                return utils.sendResponse(200, true, 'Sorry! record is not updated', errcode.NOT_FOUND, result);
            } else {
                let createdBy, updatedBy, created_by_result;

                admin_result = admin_result.msg;

                if (result.createdBy.toString() === result.updatedBy.toString()) {
                    createdBy = utils.filterUserInfo(admin_result);
                    updatedBy = utils.filterUserInfo(admin_result);

                } else {
                    updatedBy = utils.filterUserInfo(admin_result);
                    _mongo_.connect();
                    created_by_result = await Schema.User.find({ _id: ObjectId(result.createdBy) });
                    _mongo_.close();
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
                return utils.sendResponse(200, true, 'The record is updated successfully', errcode.FOUND, new_result);
            }
        } catch (DatabaseError) {
            _mongo_.close();
            log.error(DatabaseError);
            return utils.sendResponse(200, false, 'Database Error', errcode.DATABASE_ERROR, {});
        }
    },
    createNewBug: async function(A, args) {

        log.info("mutation => createNewBug");
        log.info("mutations.js");

        let form_body = args.formData;

        // checking mandatory fields
        // assign_by and assign_by is not mandatory because these fields
        // are at the time of bug allocation to developers

        let mandatory_fields = new RegExp('^(title|bug_type|status|priority|resource_id)$');
        for (let props in form_body) {
            if (mandatory_fields.test(props) === true && !Boolean(form_body[props])) {
                log.info('Not found field: ' + props);
                return utils.sendResponse(200, false, 'The mandatory fields are missing or not found', errcode.FIELDS_NOT_FOUND, {});
            }
        }

        // fields validation
        let bugs_status = new RegExp('^(open|closed|inprogress|NA|hold|delayed)$');
        if (!bugs_status.test(form_body.status)) {
            return utils.sendResponse(200, false, 'The bug status is invalid', errcode.INVALID_INPUT, {});
        }

        let priority_regex = new RegExp('^(low|high|medium)$');
        if (!priority_regex.test(form_body.priority)) {
            return utils.sendResponse(200, false, 'The bug priority is invalid', errcode.INVALID_INPUT, {});
        }

        // User validation
        // Only tester can create a bug
        let user = form_body.whoIsAllocating || 'tester';
        let userIdentity;
        switch (user) {
            case 'tester':
                try {
                    userIdentity = await utils.isUserAuthentic(form_body.resource_id);
                    if (userIdentity.err_code === 10) {
                        log.info('Sorry! the resource is not register yet');
                        return utils.sendResponse(200, false, 'Sorry! the resource is not register yet', errcode.USER_FAILED, {});
                    }
                } catch (DatabaseError) {
                    log.error('Database Error : ', DatabaseError);
                    return utils.sendResponse(200, false, 'Database Error', errcode.DATABASE_ERROR, {});
                }

                break;
            case 'admin':
                // For feature used, because I have added tester concept so tester have an 
                // authourity to create a bug.
                try {
                    userIdentity = await utils.authenticatAdminUser(form_body.assign_by);
                    if (userIdentity.err_code === 10) {
                        log.info('Sorry! the user is not register yet');
                        return utils.sendResponse(200, false, 'Sorry! the user is not register yet', errcode.USER_FAILED, {});
                    }
                } catch (DatabaseError) {
                    log.error('Database Error : ', DatabaseError);
                    return utils.sendResponse(200, false, 'Database Error', errcode.DATABASE_ERROR, {});
                }
                break;
            default:
                return utils.sendResponse(200, false, 'Sorry! we can\'t identify the user identity', errcode.USER_FAILED, {});
        }

        log.info('Resource Info : ', userIdentity);

        // find language from language master
        let lanuage_mongo_id = null
        try {
            let lang_result = await Schema.languageSchema.find({"language_id": form_body.bug_type}).lean();
            if (lang_result.length === 0 || lang_result === "" || lang_result === null) {
                return utils.sendResponse(200, false, 'Sorry! The bug type is not found in the system', errcode.NOT_FOUND, {});
            } else {
                lanuage_mongo_id = lang_result._id
            }
        } catch(DatabaseException) {
            log.info('Database Error : ', DatabaseException);
            return utils.sendResponse(200, false, 'Database Error', errcode.DATABASE_ERROR, {});
        }   

        let fresh_bug = new Schema.bug({
            bug_id: 'BG' + utils.randomId(),
            title: form_body.LanguageName,
            bug_description: form_body.status,
            bug_type: lanuage_mongo_id, // bug type is connected with language master through mongo _id.
            assign_to: null,
            assign_by: null,
            priority: form_body.priority, // low | high | medium
            status: form_body.status, // open | closed | inprogress | NA | hold | delayed
            createdBy: userIdentity.msg._id,
            updatedBy: userIdentity.msg._id,
            updatedDate: Date.now(),
            createdDate: Date.now(),
        });

        try {
            _mongo_.connect();
            let result = await fresh_bug.save();
            _mongo_.close();
            if (result == null || result === "") {
                log.info('Sorry! the bug is not created due to system failure', result);
                return utils.sendResponse(200, false, 'Sorry! the bug is not created due to system failure', errcode.NOT_FOUND, result);
            } else {
                log.info('New bug is created successfully', result);

                let createdBy, updatedBy;

                userIdentity = userIdentity.msg;

                createdBy = utils.filterUserInfo(userIdentity, 'resource');
                updatedBy = utils.filterUserInfo(userIdentity, 'resource');

                let new_result = {
                    bug: {
                        bug_id: result.bug_id,
                        bug_description: result.bug_description,
                        title: result.title,
                        status: result.status,
                        assign_to: result.assign_to,
                        assign_by: result.assign_by,
                        createdBy: createdBy,
                        updatedBy: updatedBy,
                        updatedDate: result.updatedDate,
                        createdDate: result.createdDate,
                        bug_type: result.bug_type, // such as Java, Php, Javascript etc.
                        priority: result.priority, // low | high | medium
                        status: result.status, // open | closed | inprogress | NA | hold | delayed
                        createdBy: createdBy,
                        updatedBy: updatedBy,
                        updatedDate: Date.now(),
                        createdDate: Date.now(),
                    }
                }
                return utils.sendResponse(200, true, 'New bug is created successfully', errcode.FOUND, new_result);
            }
        } catch (DatabaseError) {
            _mongo_.close();
            log.error(DatabaseError);
            return utils.sendResponse(200, false, 'Database Error', errcode.DATABASE_ERROR, {});
        }
    },

    createNewTask: async (parent, args) => {
        // Fields validation of todo
        let todo_body = JSON.parse(JSON.stringify(args.task));
        let mandatory_fields = new RegExp('^(title|createdBy)$');




        let todo = new Schema.todo();
    }
}

console.log('mutations.js is loaded successfully');
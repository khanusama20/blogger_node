const _mongo_ = require('../../../mongo-connect');
const util = require('../../utils/utility');

const _modules_ = require('../../../modules')

// Models
// const User = require('../../models/User');

// Mongoose callback convert to promise
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let log = _modules_.log.log;
let utils = _modules_.util;
const ERROR_CODE = _modules_.ERR_CODE

module.exports = {
    // fetchAllUsers: async function(parent, args) {
    //     console.log('Query : fetchAllUsers');
    //     _mongo_.connect();
    //     try {
    //         let users = await User.find({}).lean();
    //         _mongo_.close();
    //         return users;
    //     } catch(Exception) {
    //         console.log(Exception);
    //     }
    // },
    // user_login: async function(parent, args) {
    //     console.log('Query : user_login');
    //     console.log(args);
    //     _mongo_.connect();
    //     try {
    //         let O_auth = await User.find({"$and": [
    //             {"email": args['email']},
    //             {"locKey": args['password']}
    //         ]}).lean();
    //         if (O_auth.length === 0) {
    //             throw Error('Sorry! User not register yet');
    //         } else {
    //             _mongo_.close();
    //             return O_auth;
    //         }
    //     } catch(Exception) {
    //         console.log(Exception);
    //     }
    // },

    fetchSingleResource: async function(parent, args, context, info) {
        log.info('fetchSingleDeveloper', args);
        log.info('queries.js');

        let resource = _modules_.resource;
        let result = {};
        let resource_id = args['resource_id'];

        log.info("Resource ID : " + resource_id);
        try {
            _modules_._mongo_.connect();
            result = await resource.find({ 'resource_id': resource_id }).populate('createdBy', 'contact lastName firstName contact admin_id').populate('updatedBy', 'contact lastName firstName contact admin_id');
            _modules_._mongo_.close();

            if (result.length === 0) {
                log.info('Sorry! we are not found any records');
                return utils.sendResponse(200, false, 'Sorry! we are not found any records', ERROR_CODE.NOT_FOUND, result);
            } else {
                log.info('Developer is found successfully');
                result = { developer: result[0] };
                return utils.sendResponse(200, true, 'Developer is found successfully', ERROR_CODE.FOUND, result);
            }
        } catch (Exception) {
            log.error(Exception);
            return utils.sendResponse(200, false, 'Sorry! we are not found any records', ERROR_CODE.DATABASE_ERROR, result);
        }
    },
    fetchAllResource: async function(parent, args, context, info) {

        log.info('fetchAllDevelopers', args);
        log.info('queries.js');

        let resource = _modules_.resource;
        let result = {};
        try {
            _modules_._mongo_.connect();
            result = await resource.find({}).lean();
            _modules_._mongo_.close();

            if (result.length === 0) {
                log.info('Sorry! we are not found any records');
                return utils.sendResponse(200, false, 'Sorry! we are not found any records', ERROR_CODE.NOT_FOUND, result);
            } else {
                log.info('Developers found successfully');
                let _result_ = { developer: result };
                return utils.sendResponse(200, true, 'Developers found successfully', ERROR_CODE.FOUND, _result_);
            }
        } catch (Exception) {
            log.error(Exception);
            return utils.sendResponse(200, false, 'Sorry! we are not found any records', ERROR_CODE.DATABASE_ERROR, result);
        }
    },
    fetchAllLanguages: async function(parent, args, context, info) {

        log.info('fetchAllLanguages');
        log.info('queries.js');

        let languageSchema = _modules_.languageSchema;
        let result = {};
        try {
            _modules_._mongo_.connect();
            result = await languageSchema.find({}).populate('createdBy').populate('updatedBy').lean();
            _modules_._mongo_.close();

            if (result.length === 0) {
                log.info('Sorry! we are not found any records');
                return utils.sendResponse(200, false, 'Sorry! we are not found any records', ERROR_CODE.NOT_FOUND, result);
            } else {
                log.info('Records found successfully');
                let new_map_result = result.map(docs => {
                    docs.createdBy = utils.filterUserInfo(docs.createdBy);
                    docs.updatedBy = utils.filterUserInfo(docs.updatedBy);
                    return docs
                });
                let _result_ = { language: new_map_result };
                return utils.sendResponse(200, true, 'Records found successfully', ERROR_CODE.FOUND, _result_);
            }
        } catch (Exception) {
            log.error(Exception);
            return utils.sendResponse(200, false, 'Sorry! we are not found any records', ERROR_CODE.DATABASE_ERROR, result);
        }
    }
}

console.log('queries.js is loaded successfully');
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
    fetchSingleDeveloper: async function(parent, args) {
        log.info('fetchSingleDeveloper', args);
        log.info('queries.js');

        let developer = _modules_.developer;
        let result = {};
        let developer_code = args['developer_code'];

        log.info("Developer Code : " + developer_code);
        try {
            _modules_._mongo_.connect();
            result = await developer.find({'developer_code': developer_code});
            _modules_._mongo_.close();

            if (result.length === 0) {
                log.info('Sorry! we are not found any records');
                return utils.sendResponse(200, false, 'Sorry! we are not found any records', ERROR_CODE.NOT_FOUND, result);
            } else {
                log.info('Developer is found successfully');
                result = { developer: result[0]};
                return utils.sendResponse(200, true, 'Developer is found successfully', ERROR_CODE.FOUND, result);   
            }
        } catch(Exception) {
            log.error(Exception);
            return utils.sendResponse(200, false, 'Sorry! we are not found any records', ERROR_CODE.DATABASE_ERROR, result);
        }
    },
    fetchAllDevelopers: async function(parent, args) {

        log.info('fetchAllDevelopers', args);
        log.info('queries.js');

        let developer = _modules_.developer;
        let result = {};
        try {
            _modules_._mongo_.connect();
            result = await developer.find({}).lean();
            _modules_._mongo_.close();

            if (result.length === 0) {
                log.info('Sorry! we are not found any records');
                return utils.sendResponse(200, false, 'Sorry! we are not found any records', ERROR_CODE.NOT_FOUND, result);
            } else {
                log.info('Developers found successfully');
                let _result_ = { developer: result };
                return utils.sendResponse(200, true, 'Developers found successfully', ERROR_CODE.FOUND, _result_);   
            }
        } catch(Exception) {
            log.error(Exception);
            return utils.sendResponse(200, false, 'Sorry! we are not found any records', ERROR_CODE.DATABASE_ERROR, result);
        }
    }
}
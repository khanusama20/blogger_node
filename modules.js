module.exports = {
    _mongo_: require('./mongo-connect'),
    util: require('./src/utils/utility.js'),
    ERR_CODE: require('./src/error-codes.js'),
    User: require('./src/models/admin_user'),
    mongoose: require('mongoose'),
    resource: require('./src/models/developer'),
    log: require('./src/config/log_config'),
    languageSchema: require('./src/models/programming-language-master'),
    bug: require('./src/models/bug')
}
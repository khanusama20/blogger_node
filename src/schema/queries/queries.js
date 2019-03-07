const _mongo_ = require('../../../mongo-connect');
const util = require('../../utils/utility');

// Models
const User = require('../../models/User');

// Mongoose callback convert to promise
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {
    fetchAllUsers: async function(parent, args) {

    },
    
}
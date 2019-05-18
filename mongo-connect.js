// Connection with mongoDB

const mongoose = require('mongoose');
const log = require('./src/config/log_config').log;
require('dotenv').config();

const SERVER_IP = process.env.MONGO_DB_IP+':'+process.env.MONGO_PORT; // Localhost
const DB_NAME = process.env.DB_NAME // Keep is a database name which stores user notes
const DB_PATH = `mongodb://${SERVER_IP}/${DB_NAME}`


mongoose.set('debug', true);

module.exports = {
    db_info: function() { return DB_PATH},
    connect: function() {
        // await mongoose.connect(DB_PATH);
        // console.log('mongo-connection established')
        mongoose.connect(DB_PATH).then(() => {
            /** 
             * When connection done
             */
            log.info('mongo-connection is established');

        }).catch(err => {
            /** 
             * When connection failed
             */
            // console.error('mongo-connection error')
            throw new Error(err)
        })
    },

    close: function() {
        mongoose.connection.close();
        log.info('Connection is closed');
    }
}


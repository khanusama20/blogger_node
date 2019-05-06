// Connection with mongoDB

const mongoose = require('mongoose');
require('dotenv').config();

const SERVER_IP = process.env.MONGO_DB_IP+':'+process.env.MONGO_PORT; // Localhost
const DB_NAME = process.env.DB_NAME // Keep is a database name which stores user notes
const DB_PATH = `mongodb://${SERVER_IP}/${DB_NAME}`

mongoose.set('debug', true);

module.exports = {
    db_info: function() { return DB_PATH},
    connect: function() {
        mongoose.connect(DB_PATH).then(() => {
            /** 
             * When connection done
             */
            console.log('mongo-connection established')

        }).catch(err => {
            /** 
             * When connection failed
             */
            console.error('mongo-connection error')
        })
    },

    close: function() {
        mongoose.connection.close();
        console.log('mongo-connection close');
    }
}


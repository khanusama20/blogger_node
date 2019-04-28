// Connection with mongoDB

const mongoose = require('mongoose');

const SERVER_IP = '127.0.0.1:27017'; // Localhost
const DB_NAME = 'graph_db' // Keep is a database name which stores user notes
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


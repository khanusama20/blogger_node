// Connection with mongoDB

const mongoose = require('mongoose');

const SERVER_IP = '127.0.0.1:27017'; // Localhost
const DB_NAME = 'graph_db' // Keep is a database name which stores user notes

module.exports = {
    connect: function() {
        mongoose.connect(`mongodb://${SERVER_IP}/${DB_NAME}`).then(() => {
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
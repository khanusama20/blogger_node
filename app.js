/**
 * @author Khan Usama
 * @copyright Copyright(c) 2018 Khan Usama
 * MIT Licensed
 * 
 * @description This is the graphQL based project which run by Apollo Server.
 * 
 * Note: The platform which I am using for graphQL is Apollo express server v2.0
 * 
 * BloggerApp
 */

// Imports: Express
const express = require('express');
const bodyParser = require('body-parser');
const log = require('./src/config/log_config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Imports: GraphQL
const apolloServer = require('./src/schema/Schema.js');
let _mongo_ = require('./mongo-connect');

require('dotenv').config() 

// Middleware: GraphQL
apolloServer.applyMiddleware({
    app: app
});

// Express: Port
const IP_ADDRESS = process.env.HOST;
const PORT = process.env.PORT;

// Express: Listener
let server = app.listen(PORT, IP_ADDRESS || '127.0.0.1', () => {
  log.info(`The server has started on port: ${PORT}`);
  log.info(`http://${server.address().address}:${PORT}/graphql`);
  log.info('Mongodb : '+ _mongo_.db_info());
});

console.log('app.js is loaded successfully');
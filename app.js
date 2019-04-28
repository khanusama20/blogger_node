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
const app = express();

// Imports: GraphQL
const apolloServer = require('./src/schema/Schema.js');
let _modules_ = require('./modules');

// Middleware: GraphQL
apolloServer.applyMiddleware({
    app: app
});

// Express: Port
const PORT = 8089;

let log = _modules_.log.log;
// Express: Listener
app.listen(PORT, () => {
  log.info(`The server has started on port: ${PORT}`);
  log.info(`http://localhost:${PORT}/graphql`);
  log.info('Mongodb : '+ _modules_._mongo_.db_info());
});

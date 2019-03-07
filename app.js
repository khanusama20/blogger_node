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

// Middleware: GraphQL
apolloServer.applyMiddleware({
    app: app
});

// Express: Port
const PORT = 8089;
// Express: Listener
app.listen(PORT, () => {
  console.log(`The server has started on port: ${PORT}`);
  console.log(`http://localhost:${PORT}/graphql`);
});

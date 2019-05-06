const { ApolloServer } = require('apollo-server-express');

// Imports: GraphQL TypeDefs & Resolvers
const typeDefs = require('./typedefs.js') ;
const resolvers = require('./resolvers.js');

// GraphQL: Schema

/**
 * Error provided by apollo server
 * 
 * AuthenticationError
 * ForbiddenError
 * UserInputError
 * ApolloError
 */

const IP_ADDRESS = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT;

const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    // formatError: error => {
    //     console.log('Error Handling', error);
    //     return {
    //         message: error.originalError.data,
    //         status: error.originalError.code,
    //         timeStamp: new Date(Date.now())
    //     }
    // },
    playground: {
        endpoint: `http://${IP_ADDRESS}:${PORT}/graphql`,
        settings: {
            'editor.theme': 'dark'
        }
    }
});

module.exports = apolloServer
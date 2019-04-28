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
        endpoint: `http://localhost:8089/graphql`,
        settings: {
            'editor.theme': 'dark'
        }
    }
});

module.exports = apolloServer
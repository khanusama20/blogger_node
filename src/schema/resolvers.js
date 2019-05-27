const queries = require('./queries/queries');
const mutations = require('./mutations/mutations');

// GraphQL: Resolvers
const resolvers = { 
    Response: { 
        __resolveType(response, context, info) {
            // let
            // switch(response) {

            // }
        }
    },
    Query: queries, 
    Mutation: mutations 
};
// Exports statement
module.exports = resolvers;
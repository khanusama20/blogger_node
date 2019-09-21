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
    Author: {
        hobby: function (parent, args, ctx, info) {
            return {
                hobbie: "Playing"
            };
        }
    },
    Mutation: mutations 
};
// Exports statement
module.exports = resolvers;

console.log('resolvers.js loaded successfully');
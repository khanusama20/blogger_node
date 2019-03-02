const queries = require('./queries/queries');
const mutations = require('./mutations/mutations');

// GraphQL: Resolvers
const resolvers = { Query: queries, Mutation: mutations };
// Exports statement
module.exports = resolvers;
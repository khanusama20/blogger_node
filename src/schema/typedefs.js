// Imports: GraphQL
const { gql } = require('apollo-server-express');
const user = require('./types-defs/user');

// GraphQL: TypeDefs

const typeDefs = gql`
    ${user.type}

    type Query {
        ${user.queries}
    }

    ${user.input}

    type Mutation {
        ${user.mutations}
    }
`;
// Exports
module.exports = typeDefs;
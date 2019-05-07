// Imports: GraphQL
const { gql } = require('apollo-server-express');
const user = require('./types-defs/user');
// const _error_ = require('./types-defs/error')

const developer = require('./types-defs/developer');

// GraphQL: TypeDefs

const typeDefs = gql`

    interface Response {
        code: String!
        success: Boolean!
        message: String!
        errCode: Int!
    }
    ${user.type}
    ${developer.type}

    type Query {
        ${user.queries}
        ${developer.queries}
    }

    ${user.input}
    ${developer.input}

    type Mutation {
        ${developer.mutations}
        ${user.mutations}
    }
`;
// Exports
module.exports = typeDefs;
// Imports: GraphQL
const { gql } = require('apollo-server-express');
const user = require('./types-defs/user');
// const _error_ = require('./types-defs/error')

const developer = require('./types-defs/developer');
const language = require('./types-defs/languages');
const bug = require('./types-defs/bug');
const todo = require('./types-defs/todo');

// GraphQL: TypeDefs

const typeDefs = gql `

    interface Response {
        code: String!
        success: Boolean!
        message: String!
        errCode: Int!
    }

    type CreatedBy {
        _id: ID!
        firstName: String!
        lastName: String!
        admin_id: String!
        contact: String!
    }

    type UpdatedBy {
        _id: ID!
        firstName: String!
        lastName: String!
        admin_id: String!
        contact: String!
    }

    type Author {
        name: String
        age: Int
        email: String
        hobby: Hobby
    }

    type Hobby {
        hobbie: String
    }

    ${user.type}
    ${developer.type}
    ${language.type}
    ${bug.type}
    ${todo.type}

    type Query {
        ${user.queries}
        ${developer.queries}
        ${language.queries}
        ${todo.queries}

        getAuthor: Author
    }

    ${user.input}
    ${developer.input}
    ${language.input}
    ${bug.input}
    ${todo.input}

    type Mutation {
        ${developer.mutations}
        ${user.mutations}
        ${language.mutations}
        ${bug.mutations}
        ${todo.mutations}
    }
`;
// Exports
module.exports = typeDefs;
console.log('typedefs.js is loaded successfully');
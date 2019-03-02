// Imports: GraphQL
const { gql } = require('apollo-server-express');

// GraphQL: TypeDefs

const typeDefs = gql`
    type Query {
        login(email: String!, password: String!) : SignUp
    }

    type SignUp {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        contact: String!
        sex: String!
    }

    type Address {
        area: String!
        landmark: String!
        city: String!
        state: String!
        pincode: String!
    }

    type Orgnaization {
        name: String!
        contact: String!
        email: String!
        address: Address
    }

    type Reader {
        firstName: String!
        midName: String!
        lastName: String!
        address: Address
        dob: String!
        age: Int!
        gender: String!
        contact: String!
        email: String!
        occupation: String!
        joiningDate: String!
        orgnaization: Orgnaization
    }

    input InputAddress {
        area: String!
        landmark: String!
        city: String!
        state: String!
        pincode: String!
    }

    input InputOrgnaization {
        name: String!
        contact: String!
        email: String!
        address: InputAddress
    }

    input NewReader {
        firstName: String!
        midName: String!
        lastName: String!
        address: InputAddress
        dob: String!
        age: Int!
        gender: String!
        contact: String!
        email: String!
        occupation: String!
        joiningDate: String!
        orgnaization: InputOrgnaization
    }

    type Mutation {
        signup(firstName: String!, lastName: String!, email: String!, contact: String!, sex: String!): SignUp
        createNewReader(formData: NewReader): Reader
        createNewOrgnaization(formData: InputOrgnaization): Orgnaization
    }    
`;
// Exports
module.exports = typeDefs;
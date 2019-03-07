module.exports = {
    type: `
        type User {
            _id: ID!
            firstName: String!
            lastName: String!
            email: String!
            contact: String!
            sex: String!
        }
    `,

    input: `
        input SignUp {
            firstName: String!
            lastName: String!
            email: String!
            contact: String!
            sex: String!
        }
    `,
    queries: `
        fetchAllUsers: User
    `,
    mutations: `
        signup(newUser: SignUp): User
    `
}
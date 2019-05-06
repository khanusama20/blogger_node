module.exports = {
    type: `
        type User {
            _id: ID!
            admin_id: String!
            firstName: String!
            lastName: String!
            userName: String!
            contact: String!
            gender: String!
            active: String!
            profile_picture: String!
            state: String!
            city: String!
        }
    `,

    input: `
        input SignUp {
            admin_id: String!
            firstName: String!
            lastName: String!
            userName: String!
            contact: String!
            gender: String!
            active: String!
            profile_picture: String!
            state: String!
            city: String!
        }
    `,
    queries: `
    `
}
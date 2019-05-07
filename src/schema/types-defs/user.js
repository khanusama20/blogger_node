module.exports = {
    type: `
        type AdminUser {
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

        type AdminUserResponse implements Response {
            code: String!
            success: Boolean!
            message: String!
            errCode: Int!
            adminUser: AdminUser
        }
    `,

    input: `
        input NewAdminUser {
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
    `,
    mutations: `
        createNewAdminUser(formData: NewAdminUser): AdminUserResponse!
    `
}
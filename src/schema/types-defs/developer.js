module.exports = {
    type: `
        type Developer {
            _id: ID!
            firstName: String!
            lastName: String!
            developer_code: String!
            email: String!
            contact: String!
            gender: String!
            active: Boolean!
            profile_picture: String!
            state: String!
            city: String!
            developer_type: String!
            date_of_joining: String!
            no_of_times_login: String!
            date_of_birth: String
            createdBy: CreatedBy
            updatedBy: UpdatedBy
            createdDate: String!
            updatedDate: String!
        }

        type DeveloperResponse implements Response {
            code: String!
            success: Boolean!
            message: String!
            errCode: Int!
            developer: Developer
        }

        type AllDevelopers implements Response {
            code: String!
            success: Boolean!
            message: String!
            errCode: Int!
            developer: [Developer]
        }
    `,

    input: `
        input NewDeveloperAccount {
            firstName: String!
            lastName: String!
            developer_code: String!
            adminId: String!
            email: String!
            contact: String!
            gender: String!
            active: String!
            profile_picture: String
            state: String
            city: String
            date_of_joining: String
            date_of_birth: String!
            developer_type: String
        }
        
        input UpdateDeveloperDetails {
            firstName: String!
            lastName: String!
            gender: String!
            adminId: String!
            active: String!
            profile_picture: String!
            state: String!
            city: String!
            date_of_joining: String!
            date_of_birth: String!
            developer_type: String!
        }
    `,
    queries: `
        fetchAllDevelopers: AllDevelopers!
        fetchSingleDeveloper(developer_code: String!): DeveloperResponse!
        deleteSingleDeveloper(developer_code: String!): Developer!
        developerLogin(email: String!, password: String!): Developer!
    `,
    mutations: `
        createNewDeveloper(developer: NewDeveloperAccount): DeveloperResponse!
        updateDeveloperDetails(developer: UpdateDeveloperDetails): DeveloperResponse!
    `
}
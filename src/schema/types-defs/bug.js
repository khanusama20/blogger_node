module.exports = {
    type: `
        type Bug {
            _id: ID!
            bug_id: String!
            title: String!
            bug_description: String!
            bug_assign_to: Developer
            bug_type: String!
            status: String!
            bug_assign_At: String!
            bug_fixed_At: String!
            createdBy: String!
            updatedBy: String!
        }

        type BugResponse implements Response {
            code: String!
            success: Boolean!
            message: String!
            errCode: Int!
            developer: Bug
        }

        type AllBugs implements Response {
            code: String!
            success: Boolean!
            message: String!
            errCode: Int!
            developer: [Bug]
        }
    `,

    input: `
        input RaiseNewBug {
            bug_id: String!
            title: String!
            bug_description: String!
            bug_assign_to: String!
            bug_type: String!
            status: String!
        }
        
        input UpdateRaisedBug {
            title: String!
            bug_description: String!
            bug_assign_to: String!
            bug_type: String!
            status: String!
        }
    `,
    queries: `
        fetchAllDevelopers: AllDevelopers!
        fetchSingleDeveloper(developer_code: String!): DeveloperResponse!
        deleteSingleDeveloper(developer_code: String!): Developer!
        developerLogin(email: String!, password: String!): Developer!
    `,
    mutations: `
        createNewBug(bug: RaiseNewBug): Bug!
        updateCreatedBug(bug: UpdateRaisedBug): Bug!
    `
}
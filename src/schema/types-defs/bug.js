module.exports = {
    type: `
        type Bug {
            _id: ID!
            bug_id: String
            title: String
            resource_id: String
            bug_description: String
            assign_to: Resource
            assign_by: Resource
            bug_type: String
            status: String
            priority: String
            bug_assign_At: String
            bug_fixed_At: String
            createdBy: String
            updatedBy: String
        }

        type BugResponse implements Response {
            code: String!
            success: Boolean!
            message: String!
            errCode: Int!
            bug: Bug
        }

        type AllBugs implements Response {
            code: String!
            success: Boolean!
            message: String!
            errCode: Int!
            bugs: [Bug]
        }
    `,

    input: `
        input RaiseNewBug {
            title: String!
            bug_description: String
            assign_to: String!
            bug_type: String!
            status: String!
            priority: String!
            assign_by: String!
            resource_id: String!
            whoIsAllocating: String!
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
        createNewBug(formData: RaiseNewBug): BugResponse!
        updateCreatedBug(bug: UpdateRaisedBug): BugResponse!
    `
}
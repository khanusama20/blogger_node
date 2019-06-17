module.exports = {
    type: `
        type Resource {
            _id: ID!
            firstName: String
            lastName: String
            resource_id: String
            email: String
            contact: String
            gender: String
            active: Boolean
            profile_picture: String
            state: String
            city: String
            employee_status: String
            resource_type: String  
            date_of_joining: String
            no_of_times_login: String
            date_of_birth: String
            createdBy: CreatedBy
            updatedBy: UpdatedBy
            createdDate: String
            updatedDate: String
        }

        type ResourceResponse implements Response {
            code: String!
            success: Boolean!
            message: String!
            errCode: Int!
            resource: Resource
        }

        type AllResources implements Response {
            code: String!
            success: Boolean!
            message: String!
            errCode: Int!
            resource: [Resource]
        }
    `,

    input: `
        input NewResourceAccount {
            firstName: String!
            lastName: String!
            resource_id: String!
            adminId: String!
            email: String!
            contact: String!
            gender: String!
            active: String!
            profile_picture: String
            employee_status: String!
            resource_type: String!  
            state: String
            city: String
            date_of_joining: String
            date_of_birth: String!
        }
        
        input UpdateResourceDetails {
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
            employee_status: String!
            resource_type: String! 
        }
    `,
    queries: `
        fetchAllResource: AllResources!
        fetchSingleResource(resource_id: String!): ResourceResponse!
        deleteSingleResource(resource_id: String!): Resource!
        resourceLogin(email: String!, password: String!): Resource!
    `,
    mutations: `
        createNewResource(resource: NewResourceAccount): ResourceResponse!
        updateResourceDetails(resource: UpdateResourceDetails): ResourceResponse!
    `
}
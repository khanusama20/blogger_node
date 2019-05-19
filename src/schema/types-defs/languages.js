module.exports = {
    type: `
        type Language {
            _id: ID!
            LanguageName: String!
            language_id: String!
            status: String!
            createdBy: CreatedBy
            updatedBy: UpdatedBy
            createdDate: String!
            updatedDate: String!
        }

        type LanguageResponse implements Response {
            code: String!
            success: Boolean!
            message: String!
            errCode: Int!
            language: Language
        }

        type AllLanguage implements Response {
            code: String!
            success: Boolean!
            message: String!
            errCode: Int!
            language: [Language]
        }
    `,
    input: `
        input NewLanguage {
            LanguageName: String!
            language_id: String
            status: Int!
            adminId: String!
        }

        input UpdateLanguage {
            LanguageName: String!
            _id: String!
            status: Int!
            adminId: String!
        }
    
    `,
    queries: `
        fetchAllLanguages: AllLanguage!
        fetchLanguageById(language_id: String!): LanguageResponse! 
    `,
    mutations: `
        createNewLanguage(formdata: NewLanguage): LanguageResponse!
        updateExistingLanguage(formdata: UpdateLanguage): LanguageResponse!
    `
}
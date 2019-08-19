module.exports = {
	type: `
		type Owner {
			firstName: String
			lastName: String
			role: String
			_id: ID
		}

		type Todo {
			title: String!
			description: String
			priority: String
			createdDate: String
			createdBy: String!
			isAdmin: Boolean
			updatedDate: String
			deadline: String
			status: String
		}

		type TodoResponse implements Response {
            code: String!
            success: Boolean!
            message: String!
            errCode: Int!
            todo: Todo
        }

        type AllTask implements Response {
            code: String!
            success: Boolean!
            message: String!
            errCode: Int!
            todo: [Todo]
        }
	`,
	input: `
		input InputOwner {
			_id: ID
			firstName: String
			lastName: String
			role: String
		}

		input NewTask {
			title: String
			description: String 
			priority: String 
			createdBy: String
			deadline: String
			status: String
		}

		input UpdateTask {
			title: String
			description: String 
			priority: String
			deadline: String
			status: String
		}
	`,
	queries: `
		fetchAllTask: AllTask
		fetchTaskById(_id: ID) : TodoResponse
	`,

	mutations: `
		createNewTask(task: NewTask): TodoResponse
		updateTask(task: UpdateTask) : TodoResponse

	`
}
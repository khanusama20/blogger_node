module.exports = {
	type: `
		type Owner {
			firstName: String
			lastName: String
			role: String
			_id: ID
		}

		type Todo {
			title: String
			description: String
			priority: String
			createdDate: String
			createdBy: Owner
			updatedDate: String
			task_end_date: String
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
			createdBy: InputOwner
			task_end_date: String
			status: String
		}

		input UpdateTask {
			title: String
			description: String 
			priority: String
			task_end_date: String
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
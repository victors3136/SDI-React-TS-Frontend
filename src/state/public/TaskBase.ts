interface TaskBase {
    id?: string,
    name: string,
    description: string | undefined,
    priority: number,
    dueDate?: Date,
    userID: string | undefined,
}

export default TaskBase;
interface TaskBase {
    id?: string,
    name: string,
    description: string | undefined,
    priority: number,
    dueDate?: Date,
    user: string | undefined,
}

export default TaskBase;
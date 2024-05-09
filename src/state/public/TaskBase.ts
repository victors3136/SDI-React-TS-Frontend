interface TaskBase {
    id?: string,
    name: string,
    description: string | undefined,
    priority: number,
    dueDate?: Date
}

export default TaskBase;
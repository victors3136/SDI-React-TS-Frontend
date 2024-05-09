interface TaskBase {
    id?: string,
    name: string,
    description: string | null,
    priority: number,
    dueDate?: Date
}

export default TaskBase;
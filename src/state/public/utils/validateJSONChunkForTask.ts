export const validateJSONChunkForTask = (taskData: any): boolean =>
    (taskData.name !== undefined) &&
    (taskData.name !== "") &&
    (taskData.description !== undefined) &&
    (taskData.priority !== undefined) &&
    (typeof (taskData.priority) === "number") &&
    (taskData.dueDate !== undefined) &&
    (typeof (taskData.dueDate) === "string") &&
    !isNaN(Date.parse(taskData.dueDate));
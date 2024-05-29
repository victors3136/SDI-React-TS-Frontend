import {v4 as uuidv4} from 'uuid';
import ITask from '../public/ITask';
import TaskBase from "../public/TaskBase";

class Task implements ITask {
    public readonly id: string;
    public readonly name: string;
    public readonly description: string;
    public readonly priority: number;
    public readonly dueDate: Date;
    public readonly userID: string;

    public constructor(data: TaskBase) {
        this.id = data.id ?? uuidv4();
        this.name = data.name;
        this.description = data.description || "";
        this.priority = data.priority;
        this.dueDate = data.dueDate ? new Date(data.dueDate) : new Date();
        this.userID = data.userID ?? "Anonymous";
    }
}

export default Task;
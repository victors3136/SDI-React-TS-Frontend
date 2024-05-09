import {v4 as uuidv4} from 'uuid';
import ITask from '../public/ITask';
import TaskBase from "../public/TaskBase";

class Task implements ITask {
    public readonly id: string;
    public readonly name: string;
    public readonly description: string;
    public readonly priority: number;
    public readonly dueDate: Date;

    public constructor(data: TaskBase) {
        this.id = data.id ?? uuidv4();
        console.log("ID " + this.id);
        this.name = data.name;
        console.log("Name " + this.name);
        this.description = data.description || "";
        console.log("Desc " + this.description);
        this.priority = data.priority;
        console.log("Priority " + this.priority);
        this.dueDate = data.dueDate ? new Date(data.dueDate) : new Date();
        console.log("DueDate " + this.dueDate);
    }
}

export default Task;
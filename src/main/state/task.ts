import {uuid} from 'uuidv4';
import ITask from './interface-task';

class Task implements ITask {
    public  readonly id: string;
    public readonly name: string;
    public readonly description: string | null;
    public readonly priority: number;
    public  readonly dueDate: Date;

    public constructor(data: any) {
        this.id = data.id || uuid();
        this.name = data.name || '';
        this.description = data.description || null;
        this.priority = data.priority || 0;
        this.dueDate = new Date(data.dueDate) || new Date();
    }
}
export default Task;
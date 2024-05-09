import {uuid} from 'uuidv4';
import ISubtask from '../public/ISubtask';

class Subtask implements ISubtask {
    public readonly id: string;
    public readonly subject: string;
    public readonly task: string;
    public done: boolean;

    public constructor(data: any) {
        this.id = data.id || uuid();
        this.subject = data.name;
        this.task = data.task;
        this.done = data.done || false;
    }
}

export default Subtask;
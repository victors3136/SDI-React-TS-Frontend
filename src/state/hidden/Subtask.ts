import {uuid} from 'uuidv4';
import ISubtask from '../public/ISubtask';
import SubtaskBase from "../public/SubtaskBase";

class Subtask implements ISubtask {
    public readonly id: string;
    public readonly subject: string;
    public readonly task: string;
    public done: boolean;

    public constructor(data: SubtaskBase) {
        this.id = data.id || uuid();
        this.subject = data.subject;
        this.task = data.task;
        this.done = data.done || false;
    }
}

export default Subtask;
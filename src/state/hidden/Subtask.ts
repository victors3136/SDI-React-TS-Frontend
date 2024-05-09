import {v4 as uuidv4} from 'uuid';
import ISubtask from '../public/ISubtask';
import SubtaskBase from "../public/SubtaskBase";

class Subtask implements ISubtask {
    public readonly id: string;
    public readonly subject: string;
    public readonly task: string;
    public done: boolean;

    public constructor(data: SubtaskBase) {
        this.id = data.id || uuidv4();
        this.subject = data.subject;
        this.task = data.task;
        this.done = data.done || false;
    }
}

export default Subtask;
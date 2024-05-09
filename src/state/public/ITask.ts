import TaskBase from "./TaskBase";

export default interface ITask extends TaskBase {

    get id(): string;

    get name(): string;

    get description(): string | null;

    get priority(): number;

    get dueDate(): Date;
}
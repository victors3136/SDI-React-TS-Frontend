import TaskBase from "./TaskBase";

export default interface ITask extends TaskBase {

    get id(): string;

    get name(): string;

    get description(): string | undefined;

    get priority(): number;

    get dueDate(): Date;

    get user(): string | undefined;
}
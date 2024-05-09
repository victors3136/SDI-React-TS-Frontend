export default interface ITask {

    get id(): string;

    get name(): string;

    get description(): string | null;

    get priority(): number;

    get dueDate(): Date;
}
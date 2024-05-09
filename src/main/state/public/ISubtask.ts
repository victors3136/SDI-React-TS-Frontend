export default interface ISubtask {

    get id(): string;

    get subject(): string;

    get task(): string;

    get done(): boolean;

    set done(value: boolean);
}
import SubtaskBase from "./SubtaskBase";

export default interface ISubtask extends SubtaskBase {

    get id(): string;

    get subject(): string;

    get task(): string;

    get done(): boolean;

    set done(value: boolean);
}
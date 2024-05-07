import ITask from "./interface-task";
import ISubtask from "./interface-subtask";
import IColorSchemeFactory from "../../styling/IColorSchemeFactory";

export default interface ApplicationState {
    tasks: ITask[];

    setTasks(tasks: ITask[]): void;

    subtasks: ISubtask[];

    setSubtasks(subtasks: ISubtask[]): void;

    errorMessage: string;

    setErrorMessage(message: string): void;

    viewedTask: ITask;

    setViewedTask(task: ITask): void;

    editedTask: ITask;

    setEditedTask(task: ITask): void;

    addingTask: boolean;

    setAddingTask(value: boolean): void;

    viewedSubtask: ISubtask;

    setViewedSubtask(subtask: ISubtask): void;

    editedSubtask: ISubtask;

    setEditedSubtask(subtask: ISubtask): void;

    addingSubtask: boolean;

    setAddingSubtask(value: boolean): void;

    serverDown: boolean;

    setServerDown(value: boolean): void;

    latestPage: number;

    setLatestPage(id: number): void;

    styleFactory: IColorSchemeFactory

    setStyleFactory(instance: IColorSchemeFactory): void;
}
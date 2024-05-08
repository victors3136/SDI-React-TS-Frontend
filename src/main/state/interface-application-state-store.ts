import ITask from "./interface-task";
import ISubtask from "./interface-subtask";
import IColorSchemeProvider from "../../styling/IColorSchemeProvider";

export default interface ApplicationState {
    tasks: ITask[];

    setTasks(tasks: ITask[]): void;

    subtasks: ISubtask[];

    setSubtasks(subtasks: ISubtask[]): void;

    errorMessage: string;

    setErrorMessage(message: string): void;

    viewedTask: ITask | undefined;

    setViewedTask(task: ITask): void;

    editedTask: ITask | undefined;

    setEditedTask(task: ITask): void;

    addingTask: boolean;

    setAddingTask(value: boolean): void;

    viewedSubtask: ISubtask | undefined;

    setViewedSubtask(subtask: ISubtask): void;

    editedSubtask: ISubtask | undefined;

    setEditedSubtask(subtask: ISubtask): void;

    addingSubtask: boolean;

    setAddingSubtask(value: boolean): void;

    serverDown: boolean;

    setServerDown(value: boolean): void;

    latestPage: number;

    setLatestPage(id: number): void;

    colorSchemeProvider: IColorSchemeProvider

    setColorSchemeProvider(instance: IColorSchemeProvider): void;

    subtaskCount: number;

    setSubtaskCount(count: number): void;
}
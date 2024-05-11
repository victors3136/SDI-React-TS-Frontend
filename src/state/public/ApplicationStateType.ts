import ITask from "./ITask";
import ISubtask from "./ISubtask";
import IColorSchemeProvider from "../../styling/public/IColorSchemeProvider";

export default interface ApplicationState {
    tasks: ITask[];

    setTasks(tasks: ITask[]): void;

    addTask: (task: ITask) => void;

    subtasks: ISubtask[];

    setSubtasks(subtasks: ISubtask[]): void;

    errorMessage: string;

    setErrorMessage(message: string): void;

    viewedTask: ITask | undefined;

    setViewedTask(task: ITask | undefined): void;

    editedTask: ITask | undefined;

    setEditedTask(task: ITask | undefined): void;

    addingTask: boolean;

    setAddingTask(value: boolean): void;

    viewedSubtask: ISubtask | undefined;

    setViewedSubtask(subtask: ISubtask | undefined): void;

    editedSubtask: ISubtask | undefined;

    setEditedSubtask(subtask: ISubtask | undefined): void;

    serverDown: boolean;

    setServerDown(value: boolean): void;

    latestPage: number;

    setLatestPage(id: number): void;

    colorSchemeProvider: IColorSchemeProvider

    setColorSchemeProvider(instance: IColorSchemeProvider): void;

    subtaskCount: number;

    setSubtaskCount(count: number): void;

    selectedTaskIDs: Set<string>;

    setSelectedTaskIDs(ids: Set<string>): void;

    addingChildrenForATaskID: string | undefined;

    setParentTaskID(id: string | undefined): void;
}
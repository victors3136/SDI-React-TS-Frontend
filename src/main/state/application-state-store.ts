import {create} from 'zustand'
import ITask from "./interface-task";
import ISubtask from "./interface-subtask";
import ApplicationState from "./interface-application-state-store";
import DarkColorSchemeProvider from "../../styling/color-scheme-providers/DarkColorSchemeProvider";
import IColorSchemeProvider from "../../styling/IColorSchemeProvider";

const useAppStateStore = create<ApplicationState>((set) => ({
    tasks: [],
    setTasks: (tasks) => set({tasks}),
    subtasks: [],
    setSubtasks: (subtasks) => set({subtasks}),
    errorMessage: '',
    setErrorMessage: (message) => set({errorMessage: message}),
    viewedTask: {} as ITask,
    setViewedTask: (task) => set({viewedTask: task}),
    editedTask: {} as ITask,
    setEditedTask: (task) => set({editedTask: task}),
    addingTask: false,
    setAddingTask: (value) => set({addingTask: value}),
    viewedSubtask: {} as ISubtask,
    setViewedSubtask: (subtask) => set({viewedSubtask: subtask}),
    editedSubtask: {} as ISubtask,
    setEditedSubtask: (subtask) => set({editedSubtask: subtask}),
    addingSubtask: false,
    setAddingSubtask: (value) => set({addingSubtask: value}),
    serverDown: false,
    setServerDown: (value) => set({serverDown: value}),
    latestPage: 0,
    setLatestPage: (id) => set({latestPage: id}),
    styleFactory: DarkColorSchemeProvider.instantiate(),
    setStyleFactory: (instance: IColorSchemeProvider) => set({styleFactory: instance})
}));
export default useAppStateStore;
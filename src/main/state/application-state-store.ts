import {create} from 'zustand'
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
    viewedTask: undefined,
    setViewedTask: (task) => set({viewedTask: task}),
    editedTask: undefined,
    setEditedTask: (task) => set({editedTask: task}),
    addingTask: false,
    setAddingTask: (value) => set({addingTask: value}),
    viewedSubtask: undefined,
    setViewedSubtask: (subtask) => set({viewedSubtask: subtask}),
    editedSubtask: undefined,
    setEditedSubtask: (subtask) => set({editedSubtask: subtask}),
    addingSubtask: false,
    setAddingSubtask: (value) => set({addingSubtask: value}),
    serverDown: false,
    setServerDown: (value) => set({serverDown: value}),
    latestPage: 0,
    setLatestPage: (id) => set({latestPage: id}),
    colorSchemeProvider: DarkColorSchemeProvider.instantiate(),
    setColorSchemeProvider: (instance: IColorSchemeProvider) => set({colorSchemeProvider: instance}),
    subtaskCount: 0,
    setSubtaskCount: (count: number) => set({subtaskCount: count})
}));
export default useAppStateStore;
import {create} from 'zustand'
import ApplicationState from "../public/ApplicationStateType";
import DarkColorSchemeProvider from "../../styling/hidden/DarkColorSchemeProvider";
import IColorSchemeProvider from "../../styling/public/IColorSchemeProvider";
import HTTPRequestCommand from "../../main/commands/HTTPRequestCommand";

const useAppStateStore = create<ApplicationState>((set) => ({
    tasks: [],
    setTasks: (tasks) => set({tasks}),
    addTask: (task) => set((state) =>
        state.tasks.includes(task)
            ? state
            : {tasks: [...state.tasks, task]}),
    addTasks: (newTasks) => set((state) => ({tasks: [...state.tasks, ...newTasks]})),
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
    serverDown: false,
    setServerDown: (value) => set({serverDown: value}),
    latestPage: 0,
    setLatestPage: (id) => set({latestPage: id}),
    incrementPageCounter: () => set((state) => ({latestPage: state.latestPage + 1})),
    colorSchemeProvider: DarkColorSchemeProvider.instantiate(),
    setColorSchemeProvider: (instance: IColorSchemeProvider) => set({colorSchemeProvider: instance}),
    subtaskCount: 0,
    setSubtaskCount: (count: number) => set({subtaskCount: count}),
    selectedTaskIDs: new Set(),
    setSelectedTaskIDs: (ids: Set<string>) => set({selectedTaskIDs: ids}),
    addingChildrenForATaskID: undefined,
    setParentTaskID: (id: string | undefined) => set({addingChildrenForATaskID: id}),
    morePagesAvailable: true,
    setMorePagesAvailable: (value: boolean) => set({morePagesAvailable: value}),
    requestQueue: [],
    enqueueRequest: (request: HTTPRequestCommand) => set((state) =>
        ({requestQueue: [...state.requestQueue, request]})),
    dequeueRequest: () => set((state) => {
        const [_, ...rest] = state.requestQueue;
        return {requestQueue: rest};
    }),
}))
export default useAppStateStore;
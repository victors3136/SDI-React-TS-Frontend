import {create} from 'zustand'
import ApplicationState from "../public/ApplicationStateType";
import DarkColorSchemeProvider from "../../styling/hidden/DarkColorSchemeProvider";
import IColorSchemeProvider from "../../styling/public/IColorSchemeProvider";

const useAppStateStore = create<ApplicationState>((set) => ({
    jsonWebToken: undefined,
    setJSONWebToken: (jwt: string | undefined) => set({jsonWebToken: jwt}),
    logging: false,
    setLogging: (logging: boolean) => set({logging}),
    registering: false,
    setRegistering: (registering: boolean) => set({registering}),
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
    permissions: [],
    setPermissions: (value: string[]) => set({permissions: value}),
    userID: undefined,
    setUserID: (value: string) => set({userID: value})
}))
export default useAppStateStore;
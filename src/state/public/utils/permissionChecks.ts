import ApplicationState from "../ApplicationStateType";
import ITask from "../ITask";
import ISubtask from "../ISubtask";

export const ownsTask: (state: ApplicationState, task: ITask) => boolean =
    (state: ApplicationState, task: ITask) => task.user === state.userID;

export const ownsSubtask: (state: ApplicationState, subtask: ISubtask) => boolean =
    (state: ApplicationState, subtask: ISubtask) => {
        const task = state.tasks.find(t => t.id === subtask.task);
        return (task !== undefined) && (task.user === state.userID);
    }
export const hasViewPermission: (state: ApplicationState) => boolean =
    (state: ApplicationState) => state.permissions.includes('view');


export const hasAddPermission: (state: ApplicationState) => boolean =
    (state: ApplicationState) => state.permissions.includes('add');


export const hasEditOwnPermission: (state: ApplicationState) => boolean =
    (state: ApplicationState) => state.permissions.includes('edit-own');


export const hasEditAnyPermission: (state: ApplicationState) => boolean =
    (state: ApplicationState) => state.permissions.includes('edit-any');

export const canEditTask: (state: ApplicationState, task: ITask) => boolean =
    (state: ApplicationState, task: ITask) =>
        hasEditAnyPermission(state)
        || (ownsTask(state, task) && hasEditOwnPermission(state));

export const canEditSubtask: (state: ApplicationState, subtask: ISubtask) => boolean =
    (state: ApplicationState, subtask: ISubtask) =>
        hasEditAnyPermission(state)
        || (ownsSubtask(state, subtask) && hasEditOwnPermission(state));

export const hasDeleteOwnPermission: (state: ApplicationState) => boolean =
    (state: ApplicationState) => state.permissions.includes('delete-own');


export const hasDeleteAnyPermission: (state: ApplicationState) => boolean =
    (state: ApplicationState) => state.permissions.includes('delete-any');

export const canDeleteTask: (state: ApplicationState, task: ITask) => boolean =
    (state: ApplicationState, task: ITask) =>
        hasEditAnyPermission(state)
        || (ownsTask(state, task) && hasEditOwnPermission(state));


export const canDeleteSubtask: (state: ApplicationState, subtask: ISubtask) => boolean =
    (state: ApplicationState, subtask: ISubtask) =>
        hasDeleteAnyPermission(state)
        || (ownsSubtask(state, subtask) && hasDeleteOwnPermission(state));


export const hasDeleteBatchPermission: (state: ApplicationState) => boolean =
    (state: ApplicationState) => state.permissions.includes('delete-batch');


export const hasAssignPermission: (state: ApplicationState) => boolean =
    (state: ApplicationState) => state.permissions.includes('assign');


export const hasKickPermission: (state: ApplicationState) => boolean =
    (state: ApplicationState) => state.permissions.includes('kick');
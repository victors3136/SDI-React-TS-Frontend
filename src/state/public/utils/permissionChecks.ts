import ApplicationState from "../ApplicationStateType";

export const hasViewPermission: (state: ApplicationState) => boolean =
    (state: ApplicationState) => state.permissions.includes('view');


export const hasAddPermission: (state: ApplicationState) => boolean =
    (state: ApplicationState) => state.permissions.includes('add');


export const hasEditOwnPermission: (state: ApplicationState) => boolean =
    (state: ApplicationState) => state.permissions.includes('edit-own');


export const hasEditAnyPermission: (state: ApplicationState) => boolean =
    (state: ApplicationState) => state.permissions.includes('edit-any');


export const hasDeleteOwnPermission: (state: ApplicationState) => boolean =
    (state: ApplicationState) => state.permissions.includes('delete-own');


export const hasDeleteAnyPermission: (state: ApplicationState) => boolean =
    (state: ApplicationState) => state.permissions.includes('delete-any');


export const hasDeleteBatchPermission: (state: ApplicationState) => boolean =
    (state: ApplicationState) => state.permissions.includes('delete-batch');


export const hasAssignPermission: (state: ApplicationState) => boolean =
    (state: ApplicationState) => state.permissions.includes('assign');


export const hasKickPermission: (state: ApplicationState) => boolean =
    (state: ApplicationState) => state.permissions.includes('kick');
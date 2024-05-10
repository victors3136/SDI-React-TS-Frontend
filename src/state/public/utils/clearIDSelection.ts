import ApplicationState from "../ApplicationStateType";

export const clearIDSelection = (state: ApplicationState) => {
    state.setSelectedTaskIDs(new Set());
}
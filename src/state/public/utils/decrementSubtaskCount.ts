import ApplicationState from "../ApplicationStateType";

export const decrementSubtaskCount = (state: ApplicationState) => {
    const newCount = state.subtaskCount - 1;
    state.setSubtaskCount(newCount);
}
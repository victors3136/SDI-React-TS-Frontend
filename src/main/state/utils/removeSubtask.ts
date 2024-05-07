import ApplicationState from "../interface-application-state-store";

const removeSubtask = (state: ApplicationState, subtaskID: string) => {
    const filteredSubtasks = state.subtasks.filter(subtask => subtask.id !== subtaskID);
    state.setSubtasks(filteredSubtasks);
}
export default removeSubtask;
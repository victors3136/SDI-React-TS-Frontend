import ApplicationState from "../ApplicationStateType";
import ISubtask from "../ISubtask";

const editSubtask = (state: ApplicationState, editedSubtask: ISubtask) => {
    const updatedSubtasks = state.subtasks.map(subtask => subtask.id === editedSubtask.id ? editedSubtask : subtask);
    state.setSubtasks(updatedSubtasks);
}
export default editSubtask;
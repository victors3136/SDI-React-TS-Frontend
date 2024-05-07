import ApplicationState from "../interface-application-state-store";
import ISubtask from "../interface-subtask";

const editSubtask = (state: ApplicationState, editedSubtask: ISubtask) => {
    const updatedSubtasks = state.subtasks.map(subtask => subtask.id === editedSubtask.id ? subtask : editedSubtask);
    state.setSubtasks(updatedSubtasks);
}
export default editSubtask;
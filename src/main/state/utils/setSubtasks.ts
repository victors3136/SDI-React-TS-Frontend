import ApplicationState from "../interface-application-state-store";
import ISubtask from "../interface-subtask";

const setSubtasks = (state: ApplicationState, subtasks: ISubtask[]) =>
    state.setSubtasks([...subtasks]);
export default setSubtasks;
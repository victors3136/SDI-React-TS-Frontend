import ApplicationState from "../ApplicationStateType";
import ISubtask from "../ISubtask";

const setSubtasks = (state: ApplicationState, subtasks: ISubtask[]) =>
    state.setSubtasks([...subtasks]);
export default setSubtasks;
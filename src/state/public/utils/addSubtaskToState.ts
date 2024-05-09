import ApplicationState from "../ApplicationStateType";
import ISubtask from "../ISubtask";

const addSubtaskToState = (state: ApplicationState, subtask: ISubtask) =>
    state.setSubtasks([...state.subtasks, subtask])
export default addSubtaskToState;
import ApplicationState from "../interface-application-state-store";
import ISubtask from "../interface-subtask";

const addSubtaskToState = (state: ApplicationState, subtask: ISubtask) =>
    state.setSubtasks([...state.subtasks, subtask])
export default addSubtaskToState;
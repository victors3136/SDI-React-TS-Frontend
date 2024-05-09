import ApplicationState from "../ApplicationStateType";
import ITask from "../ITask";

const addTaskToState = (state: ApplicationState, task: ITask) =>
    state.setTasks([...state.tasks, task])
export default addTaskToState;
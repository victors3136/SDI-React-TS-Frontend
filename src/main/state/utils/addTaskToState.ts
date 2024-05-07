import ApplicationState from "../interface-application-state-store";
import ITask from "../interface-task";

const addTaskToState = (state: ApplicationState, task: ITask) =>
    state.setTasks([...state.tasks, task])
export default addTaskToState;
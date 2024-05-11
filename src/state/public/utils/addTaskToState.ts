import ApplicationState from "../ApplicationStateType";
import ITask from "../ITask";

const addTaskToState = (state: ApplicationState, task: ITask) => {
    state.addTask(task);
}
export default addTaskToState;
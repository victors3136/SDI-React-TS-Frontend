import ITask from "../ITask";
import ApplicationState from "../ApplicationStateType";

const setTasks = (state: ApplicationState, tasks: ITask[]) =>
    state.setTasks(tasks);
export default setTasks;
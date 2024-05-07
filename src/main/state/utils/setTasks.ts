import ITask from "../interface-task";
import ApplicationState from "../interface-application-state-store";

const setTasks = (state: ApplicationState, tasks: ITask[]) =>
    state.setTasks(tasks);
export default setTasks;
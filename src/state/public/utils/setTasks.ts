import ITask from "../ITask";
import ApplicationState from "../ApplicationStateType";

const setTasks = (state: ApplicationState, tasks: ITask[]) => {
    const uniqueTasks: ITask[] = Array.from(new Set<ITask>(tasks));
    state.setTasks(uniqueTasks);
}
export default setTasks;
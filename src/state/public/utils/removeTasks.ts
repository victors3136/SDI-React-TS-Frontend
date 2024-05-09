import ApplicationState from "../ApplicationStateType";

const removeTasks = (state: ApplicationState, taskIds: string[]) => {
    const filteredTasks = state.tasks.filter(task => !taskIds.includes(task.id));
    state.setTasks(filteredTasks);
}
export default removeTasks;
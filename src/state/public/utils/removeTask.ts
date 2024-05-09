import ApplicationState from "../ApplicationStateType";

const removeTask = (state: ApplicationState, taskId: string) => {
    const filteredTasks = state.tasks.filter(task => task.id !== taskId);
    state.setTasks(filteredTasks);
}
export default removeTask;
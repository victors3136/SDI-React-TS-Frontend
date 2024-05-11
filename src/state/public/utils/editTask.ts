import ApplicationState from "../ApplicationStateType";
import ITask from "../ITask";

const editTask = (state: ApplicationState, editedTask: ITask) => {
    const updatedTasks = state.tasks.map(task => task.id === editedTask.id ? editedTask : task);
    state.setTasks(updatedTasks);
}
export default editTask;
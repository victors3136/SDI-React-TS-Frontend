import ApplicationState from "../ApplicationStateType";
import ITask from "../ITask";

const editTask = (state: ApplicationState, editedTask: ITask) => {
    const updatedTasks = state.tasks.map(task => task.id === editedTask.id ? task : editedTask);
    state.setTasks(updatedTasks);
}
export default editTask;
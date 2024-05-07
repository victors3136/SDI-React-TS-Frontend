import ApplicationState from "../interface-application-state-store";
import ITask from "../interface-task";

const editTask = (state: ApplicationState, editedTask: ITask) => {
    const updatedTasks = state.tasks.map(task => task.id === editedTask.id ? task : editedTask);
    state.setTasks(updatedTasks);
}
export default editTask;
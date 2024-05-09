import ApplicationState from "../ApplicationStateType";
import ITask from "../ITask";

const addMultipleTasksToState = (state: ApplicationState, taskList: ITask[]) =>
    state.setTasks([...state.tasks, ...taskList]);

export default addMultipleTasksToState;
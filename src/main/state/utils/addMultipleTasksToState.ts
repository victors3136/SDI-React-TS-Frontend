import ApplicationState from "../interface-application-state-store";
import ITask from "../interface-task";

const addMultipleTasksToState = (state: ApplicationState, taskList: ITask[]) =>
    state.setTasks([...state.tasks, ...taskList]);

export default addMultipleTasksToState;
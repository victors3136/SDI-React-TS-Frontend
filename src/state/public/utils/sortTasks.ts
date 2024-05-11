import ITask from "../ITask";
import setTasks from "./setTasks";
import ApplicationState from "../ApplicationStateType";

export const sortTasks = (state: ApplicationState, orderingDirection: string) => {
    if (!["ASC", "DES"].find(option => option === orderingDirection)) {
        return;
    }
    const comparator = orderingDirection.toUpperCase() === "DES"
        ? (taskA: ITask, taskB: ITask) => taskA.priority - taskB.priority
        : (taskA: ITask, taskB: ITask) => taskB.priority - taskA.priority;
    const sortedList = state.tasks.sort(comparator);
    setTasks(state, sortedList);
}
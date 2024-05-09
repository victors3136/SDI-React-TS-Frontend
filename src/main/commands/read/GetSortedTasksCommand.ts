import HTTPRequestCommandBase from "../common/HTTPRequestCommandBase";
import ApplicationState from "../../state/public/ApplicationStateType";
import ITask from "../../state/public/ITask";
import Task from "../../state/hidden/Task";
import setTasks from "../../state/public/utils/setTasks";

class GetSortedTasksCommand extends HTTPRequestCommandBase {
    private orderingDirection: string;

    public constructor(orderingDirection?: string) {
        super();
        this.orderingDirection = orderingDirection ?? "DES";
    }

    request = (state: ApplicationState) =>
        this.client
            .get(`/task?priority=/${this.orderingDirection}`)
            .then(response => {
                const sortedListOfTasks: ITask[] =
                    response.data.content.map((jsonChunk: object) =>
                        new Task(jsonChunk));
                state.setTasks(sortedListOfTasks);
            })
            .catch(err => this.handleError(state, err));

    protected handleError(state: ApplicationState, err: Error) {
        super.handleError(state, err);
        this.localSync(state);
    }

    localSync = (state: ApplicationState) => {
        const comparator = this.orderingDirection.toUpperCase() === "DSC"
            ? (taskA: ITask, taskB: ITask) => taskA.priority - taskB.priority
            : (taskA: ITask, taskB: ITask) => taskB.priority - taskA.priority;
        const sortedList = state.tasks.sort(comparator);
        setTasks(state, sortedList);
    }
}

export default GetSortedTasksCommand;
import HTTPRequestCommandBase from "../HTTPRequestCommandBase";
import ApplicationState from "../../state/interface-application-state-store";
import ITask from "../../state/interface-task";
import Task from "../../state/task";
import setTasks from "../../state/utils/setTasks";

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
import HTTPRequestCommandBase from "./HTTPRequestCommandBase";
import ApplicationState from "../state/interface-application-state-store";
import Task from "../state/task";
import addMultipleTasksToState from "../state/utils/addMultipleTasksToState";
import ITask from "../state/interface-task";

class GetTaskPageCommand extends HTTPRequestCommandBase {
    private pageNumber: number;

    public constructor(pageNum?: number) {
        super();
        this.pageNumber = pageNum ?? 0;
    }

    public execute = (state: ApplicationState) =>
        this.client
            .get(`/task/all/${this.pageNumber}`)
            .then(response => {
                const list: ITask[] = response.data.content.map((dataChunk: object) => new Task(dataChunk));
                addMultipleTasksToState(state, list);
            })
            .catch(err => this.handleError(state, err));
}

export default GetTaskPageCommand;
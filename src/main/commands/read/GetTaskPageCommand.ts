import HTTPRequestCommandBase from "../HTTPRequestCommandBase";
import ApplicationState from "../../state/interface-application-state-store";
import Task from "../../state/task";
import addMultipleTasksToState from "../../state/utils/addMultipleTasksToState";
import ITask from "../../state/interface-task";

class GetTaskPageCommand extends HTTPRequestCommandBase {
    private pageNumber: number;

    public constructor(pageNum?: number) {
        super();
        this.pageNumber = pageNum ?? 0;
    }

    request = (state: ApplicationState) =>
        this.client
            .get(`/task/all/${this.pageNumber}`)
            .then(response => {
                const list: ITask[] =
                    response.data.content.map((jsonChunk: object) =>
                        new Task(jsonChunk));
                addMultipleTasksToState(state, list);
            })
            .catch(err => this.handleError(state, err));

    localSync = (state: ApplicationState) => {
        console.log("No more pages could be loaded");
    }
}

export default GetTaskPageCommand;
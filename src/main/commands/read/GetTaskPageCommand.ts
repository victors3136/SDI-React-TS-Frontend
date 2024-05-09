import HTTPRequestCommandBase from "../common/HTTPRequestCommandBase";
import ApplicationState from "../../state/public/ApplicationStateType";
import Task from "../../state/hidden/Task";
import addMultipleTasksToState from "../../state/public/utils/addMultipleTasksToState";
import ITask from "../../state/public/ITask";

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
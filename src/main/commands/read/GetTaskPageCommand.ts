import HTTPRequestCommandBase from "../common/HTTPRequestCommandBase";
import ApplicationState from "../../../state/public/ApplicationStateType";
import Task from "../../../state/hidden/Task";
import addMultipleTasksToState from "../../../state/public/utils/addMultipleTasksToState";
import ITask from "../../../state/public/ITask";
import TaskBase from "../../../state/public/TaskBase";

class GetTaskPageCommand extends HTTPRequestCommandBase {
    private pageNumber: number;

    public constructor(pageNum?: number) {
        super();
        this.pageNumber = pageNum ?? 0;
    }

    request = (state: ApplicationState) => {
        console.log("Requesting a page of tasks");
        this.client
            .get(`/task/all/${this.pageNumber}`)
            .then(response => {
                const list: ITask[] =
                    response.data.content.map((jsonChunk: TaskBase) => new Task(jsonChunk));
                addMultipleTasksToState(state, list);
                state.setLatestPage(state.latestPage + 1);
            })
            .catch(err => this.handleError(state, err));
    }
    localSync = (state: ApplicationState) => {
        console.log("No more pages could be loaded");
    }
}

export default GetTaskPageCommand;
import HTTPRequestCommandBase from "../common/HTTPRequestCommandBase";
import ApplicationState from "../../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";
import Subtask from "../../../state/hidden/Subtask";
import setSubtasks from "../../../state/public/utils/setSubtasks";
import SubtaskBase from "../../../state/public/SubtaskBase";
import ITask from "../../../state/public/ITask";
import TaskBase from "../../../state/public/TaskBase";
import Task from "../../../state/hidden/Task";
import ISubtask from "../../../state/public/ISubtask";

class GetSubtasksForTask extends HTTPRequestCommandBase {
    protected taskId: string;

    public constructor(taskId: string) {
        super();
        this.taskId = taskId;
    }

    request = (state: ApplicationState) =>
        this.client
            .get(`/subtask/by_parent/${this.taskId}`)
            .then(response => {
                switch (response.status) {
                    case HttpStatusCode.Ok:
                        const subtasks: ISubtask[] = response.data.map((jsonChunk: SubtaskBase) => new Subtask(jsonChunk));
                        setSubtasks(state, subtasks);
                        break;
                    case HttpStatusCode.BadRequest:
                        state.setErrorMessage("Request failed server-side validation");
                        break;
                    case HttpStatusCode.NotFound:
                        state.setErrorMessage("Entity could not be found");
                        break;
                    default:
                        throw new Error(`Unhandled response code: ${response.status}`);
                }
            })
            .catch(err => this.handleError(state, err));
    localSync = (state: ApplicationState) => {
        console.log("No children could be ");
    }
}

export default GetSubtasksForTask;
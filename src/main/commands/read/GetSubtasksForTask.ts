import HTTPRequestCommand from "../HTTPRequestCommand";
import ApplicationState from "../../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";
import Subtask from "../../../state/hidden/Subtask";
import SubtaskBase from "../../../state/public/SubtaskBase";
import ISubtask from "../../../state/public/ISubtask";

class GetSubtasksForTask extends HTTPRequestCommand {
    protected taskId: string;
    protected subtasks: ISubtask[];

    public constructor(taskId: string) {
        super();
        this.taskId = taskId;
        this.subtasks = [];
    }

    protected async request(state: ApplicationState) {
        const url = `/subtask/by_parent/${this.taskId}`;
        console.log(`requesting ${url}`);
        const response = await this.client.get(url);
        switch (response.status) {
            case HttpStatusCode.Ok:
                this.subtasks = response.data.map((jsonChunk: SubtaskBase) => new Subtask(jsonChunk));
                state.setSubtasks(this.subtasks);
                break;
            case HttpStatusCode.BadRequest:
                state.setErrorMessage("Request failed server-side validation");
                break;
            case HttpStatusCode.NotFound:
                state.setErrorMessage("Entity could not be found");
                break;
            default:
                throw new Error(`Network Error: ${response.status}`);
        }
    }

    protected syncLocal(state: ApplicationState) {
        state.setSubtasks(this.subtasks);
    }
}

export default GetSubtasksForTask;
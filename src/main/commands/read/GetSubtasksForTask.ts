import HTTPRequestCommand from "../HTTPRequestCommand";
import ApplicationState from "../../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";
import Subtask from "../../../state/hidden/Subtask";
import SubtaskBase from "../../../state/public/SubtaskBase";
import ISubtask from "../../../state/public/ISubtask";
import IHTTPClient from "../../requests/public/IHTTPClient";

class GetSubtasksForTask extends HTTPRequestCommand {
    protected taskId: string;
    protected subtasks: ISubtask[];

    public constructor(taskId: string, client?: IHTTPClient) {
        super(client);
        this.taskId = taskId;
        this.subtasks = [];
    }

    public async execute(state: ApplicationState) {
        if (HTTPRequestCommand.serverIsDown) {
            state.setSubtasks([]);
            return;
        }
        const url = `/subtask/by_parent/${this.taskId}`;
        console.log(`requesting ${url}`);
        let response;
        try {
            response = await this.client.get(url);
        } catch (_error) {
            state.setErrorMessage("Service unavailable");
            HTTPRequestCommand.serverIsDown = true;
            return;
        }
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
                state.setErrorMessage("Service unavailable");
                HTTPRequestCommand.serverIsDown = true;
        }
    }
}

export default GetSubtasksForTask;
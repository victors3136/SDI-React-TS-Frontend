import HTTPRequestCommand from "../HTTPRequestCommand";
import ApplicationState from "../../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";
import IHTTPClient from "../../requests/public/IHTTPClient";

class GetSubtaskCountForTask extends HTTPRequestCommand {
    protected taskId: string;
    private subtaskCount: number | undefined;

    public constructor(taskId: string, client?: IHTTPClient) {
        super(client);
        this.taskId = taskId;
        this.subtaskCount = undefined;
    }

    public async execute(state: ApplicationState) {
        if (HTTPRequestCommand.serverIsDown) {
            state.setSubtaskCount(-1);
            return;
        }
        const url = `/subtask/count/${this.taskId}`;
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
                this.subtaskCount = parseInt(response.data);
                state.setSubtaskCount(this.subtaskCount);
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

export default GetSubtaskCountForTask;
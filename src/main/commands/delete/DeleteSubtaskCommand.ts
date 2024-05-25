import ApplicationState from "../../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";
import removeSubtask from "../../../state/public/utils/removeSubtask";
import {RetryableHTTPRequestCommand} from "../RetryableHTTPRequestCommand";
import IHTTPClient from "../../requests/public/IHTTPClient";

class DeleteSubtaskCommand extends RetryableHTTPRequestCommand {
    protected subtaskID: string;

    public constructor(subtaskID: string, client?: IHTTPClient) {
        super(client);
        this.subtaskID = subtaskID;
    }

    protected async request(state: ApplicationState) {
        const url = `/subtask/${this.subtaskID}`;
        const response = await this.client.delete(url);
        switch (response.status) {
            case HttpStatusCode.NoContent:
                break;
            case HttpStatusCode.BadRequest:
                state.setErrorMessage("Request failed server-side validation");
                break;
            case HttpStatusCode.NotFound:
                state.setErrorMessage("Entry could not be found");
                break;
            default:
                throw new Error(`Network Error: ${response.status}`);
        }
    }

    protected syncLocal(state: ApplicationState) {
        removeSubtask(state, this.subtaskID);
    }
    protected showEffectOnPageBeforeSendingToServer(): boolean {
        return true;
    }
}

export default DeleteSubtaskCommand;
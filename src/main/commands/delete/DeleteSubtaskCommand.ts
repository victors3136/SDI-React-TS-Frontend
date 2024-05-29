import ApplicationState from "../../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";
import removeSubtask from "../../../state/public/utils/removeSubtask";
import {RetryableHTTPRequestCommand} from "../RetryableHTTPRequestCommand";
import IHTTPClient from "../../requests/public/IHTTPClient";
import {handleCommandResponseProblemStatus} from "../auxilliaries/handleCommandResponseProblemStatus";

class DeleteSubtaskCommand extends RetryableHTTPRequestCommand {
    protected subtaskID: string;

    public constructor(subtaskID: string, client?: IHTTPClient) {
        super(client);
        this.subtaskID = subtaskID;
    }

    protected async request(state: ApplicationState) {
        const url = `/subtask/${this.subtaskID}`;
        const response = await this.client.delete(url);
        if (response.status !== HttpStatusCode.NoContent) {
            handleCommandResponseProblemStatus(response, state);
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
import ApplicationState from "../../../state/public/ApplicationStateType";
import removeTask from "../../../state/public/utils/removeTask";
import {HttpStatusCode} from "axios";
import {RetryableHTTPRequestCommand} from "../RetryableHTTPRequestCommand";
import IHTTPClient from "../../requests/public/IHTTPClient";
import {handleCommandResponseProblemStatus} from "../auxilliaries/handleCommandResponseProblemStatus";

class DeleteTaskCommand extends RetryableHTTPRequestCommand {
    protected taskID: string;

    public constructor(taskID: string, client?: IHTTPClient) {
        super(client);
        this.taskID = taskID;
    }

    protected async request(state: ApplicationState) {
        const url = `/task/${this.taskID}`;
        const response = await this.client.delete(url);
        if (response.status !== HttpStatusCode.NoContent) {
            handleCommandResponseProblemStatus(response, state);
        }
    }

    protected syncLocal(state: ApplicationState) {
        removeTask(state, this.taskID);
    }

    protected showEffectOnPageBeforeSendingToServer(): boolean {
        return true;
    }
}

export default DeleteTaskCommand;
import ApplicationState from "../../../state/public/ApplicationStateType";
import removeTasks from "../../../state/public/utils/removeTasks";
import {HttpStatusCode} from "axios";
import {clearIDSelection} from "../../../state/public/utils/clearIDSelection";
import {RetryableHTTPRequestCommand} from "../RetryableHTTPRequestCommand";
import IHTTPClient from "../../requests/public/IHTTPClient";

class DeleteTaskBatchCommand extends RetryableHTTPRequestCommand {
    protected taskIDS: string[];

    public constructor(taskIDS: string[], client?: IHTTPClient) {
        super(client);
        const set = new Set(taskIDS);
        // @ts-ignore
        this.taskIDS = [...set];
    }

    protected async request(state: ApplicationState) {
        if (this.taskIDS.length === 0) {
            return;
        }
        const url = '/task/batch';
        const payload = this.taskIDS;
        const response = await this.client.delete(url, payload);

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
        removeTasks(state, this.taskIDS);
        clearIDSelection(state);

    }

    protected showEffectOnPageBeforeSendingToServer(): boolean {
        return true;
    }
}

export default DeleteTaskBatchCommand;
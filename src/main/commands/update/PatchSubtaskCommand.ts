import ApplicationState from "../../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";
import editSubtask from "../../../state/public/utils/editSubtask";
import ISubtask from "../../../state/public/ISubtask";
import Subtask from "../../../state/hidden/Subtask";
import IHTTPClient from "../../requests/public/IHTTPClient";
import {RetryableHTTPRequestCommand} from "../RetryableHTTPRequestCommand";

class PatchSubtaskCommand extends RetryableHTTPRequestCommand {
    protected baseSubtaskID: string;
    protected updatedSubtask: ISubtask;

    public constructor(baseSubtaskID: string, updatedSubtask: ISubtask, client?: IHTTPClient) {
        super(client);
        this.baseSubtaskID = baseSubtaskID;
        this.updatedSubtask = new Subtask({...updatedSubtask, id: baseSubtaskID});
    }

    protected async request(state: ApplicationState) {
        const url = `subtask/${this.baseSubtaskID}`;
        const payload = this.updatedSubtask;
        const response = await this.client.patch(url, payload);
        switch (response.status) {
            case HttpStatusCode.Ok:
                // editSubtask(state, this.updatedSubtask); -- should get handled by sync local
                break;
            case HttpStatusCode.BadRequest:
                state.setErrorMessage("Request failed server-side validation");
                break
            case HttpStatusCode.NotFound:
                state.setErrorMessage("Entry could not be found");
                break;
            default:
                throw new Error(`Network Error: ${response.status}`);
        }
    }

    protected syncLocal(state: ApplicationState) {
        editSubtask(state, this.updatedSubtask);
    }

    protected showEffectOnPageBeforeSendingToServer(): boolean {
        return true;
    }
}

export default PatchSubtaskCommand;
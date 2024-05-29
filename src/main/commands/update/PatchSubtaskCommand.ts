import ApplicationState from "../../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";
import editSubtask from "../../../state/public/utils/editSubtask";
import ISubtask from "../../../state/public/ISubtask";
import Subtask from "../../../state/hidden/Subtask";
import IHTTPClient from "../../requests/public/IHTTPClient";
import {RetryableHTTPRequestCommand} from "../RetryableHTTPRequestCommand";
import {handleCommandResponseProblemStatus} from "../auxilliaries/handleCommandResponseProblemStatus";

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
        if (response.status !== HttpStatusCode.Ok) {
            handleCommandResponseProblemStatus(response, state);
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
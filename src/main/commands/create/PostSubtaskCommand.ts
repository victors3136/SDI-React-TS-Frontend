import ApplicationState from "../../../state/public/ApplicationStateType";
import ISubtask from "../../../state/public/ISubtask";
import Subtask from "../../../state/hidden/Subtask";
import addSubtaskToState from "../../../state/public/utils/addSubtaskToState";
import {HttpStatusCode} from "axios";
import SubtaskBase from "../../../state/public/SubtaskBase";
import {RetryableHTTPRequestCommand} from "../RetryableHTTPRequestCommand";
import IHTTPClient from "../../requests/public/IHTTPClient";
import {handleCommandResponseProblemStatus} from "../auxilliaries/handleCommandResponseProblemStatus";

class PostSubtaskCommand extends RetryableHTTPRequestCommand {

    protected subtask: ISubtask;

    public constructor(data: SubtaskBase, client?: IHTTPClient) {
        super(client);
        this.subtask = new Subtask(data);
    }

    protected async request(state: ApplicationState): Promise<void> {
        const url = '/subtask';
        let response: { status: number, data: { id: string } };
        response = await this.client.post(url, this.subtask);
        if (response.status === HttpStatusCode.Created) {
            const subtaskId = response.data.id;
            this.subtask = new Subtask({...this.subtask, id: subtaskId});
        } else {
            handleCommandResponseProblemStatus(response, state);
        }
    }

    protected syncLocal(state: ApplicationState) {
        addSubtaskToState(state, this.subtask);
    }

    protected showEffectOnPageBeforeSendingToServer(): boolean {
        return false;
    }
}

export default PostSubtaskCommand;
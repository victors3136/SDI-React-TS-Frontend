import ApplicationState from "../../../state/public/ApplicationStateType";
import ISubtask from "../../../state/public/ISubtask";
import Subtask from "../../../state/hidden/Subtask";
import addSubtaskToState from "../../../state/public/utils/addSubtaskToState";
import {HttpStatusCode} from "axios";
import SubtaskBase from "../../../state/public/SubtaskBase";
import {RetryableHTTPRequestCommand} from "../RetryableHTTPRequestCommand";
import IHTTPClient from "../../requests/public/IHTTPClient";

class PostSubtaskCommand extends RetryableHTTPRequestCommand {
    protected subtask: ISubtask;

    public constructor(data: SubtaskBase, client?: IHTTPClient) {
        super(client);
        this.subtask = new Subtask(data);
    }

    protected async request(state: ApplicationState): Promise<void> {
        const url = '/subtask';
        console.log(`requesting ${url}`);
        const response = await this.client.post(url, this.subtask);
        switch (response.status) {
            case HttpStatusCode.Created:
                const subtaskId = response.data.id;
                this.subtask = new Subtask({...this.subtask, id: subtaskId});
                break;
            case HttpStatusCode.BadRequest:
                state.setErrorMessage('Server-side validation failed');
                break;
            default:
                throw new Error(`Network Error: ${response.status}`);
        }
    }

    protected syncLocal(state: ApplicationState) {
        addSubtaskToState(state, this.subtask);
    }
}

export default PostSubtaskCommand;
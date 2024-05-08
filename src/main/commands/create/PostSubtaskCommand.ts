import ApplicationState from "../../state/interface-application-state-store";
import ISubtask from "../../state/interface-subtask";
import Subtask from "../../state/subtask";
import addSubtaskToState from "../../state/utils/addSubtaskToState";
import HTTPRequestCommandBase from "../HTTPRequestCommandBase";
import {AxiosResponse, HttpStatusCode} from "axios";

class PostSubtaskCommand extends HTTPRequestCommandBase {
    protected subtask: ISubtask;

    public constructor(data: object) {
        super();
        this.subtask = new Subtask(data);
    }

    request = (state: ApplicationState) =>
        this.client
            .post('/subtask', this.subtask)
            .then((response: AxiosResponse<{ id: string }>) => {
                switch (response.status) {
                    case HttpStatusCode.Created:
                        this.subtask = new Subtask({
                            id: response.data.id,
                            subject: this.subtask.subject,
                            task: this.subtask.task,
                        });
                        this.localSync(state);
                        break;
                    case HttpStatusCode.BadRequest:
                        state.setErrorMessage("Request failed server-side validation");
                        break;
                    default:
                        throw new Error(`Unhandled response code: ${response.status}`);
                }
                state.setServerDown(false);
            })
            .catch(err => this.handleError(state, err))
            .finally(() => this.syncIfNotRetrying(state));

    localSync = (state: ApplicationState) => addSubtaskToState(state, this.subtask)
}

export default PostSubtaskCommand;
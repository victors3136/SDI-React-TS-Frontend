import ApplicationState from "../../../state/public/ApplicationStateType";
import ISubtask from "../../../state/public/ISubtask";
import Subtask from "../../../state/hidden/Subtask";
import addSubtaskToState from "../../../state/public/utils/addSubtaskToState";
import HTTPRequestCommandBase from "../HTTPRequestCommandBase";
import {AxiosResponse, HttpStatusCode} from "axios";
import SubtaskBase from "../../../state/public/SubtaskBase";

class PostSubtaskCommand extends HTTPRequestCommandBase {
    protected subtask: ISubtask;

    public constructor(data: SubtaskBase) {
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
                        this.syncAndCleanup(state);
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

    syncAndCleanup = (state: ApplicationState) => addSubtaskToState(state, this.subtask)
}

export default PostSubtaskCommand;
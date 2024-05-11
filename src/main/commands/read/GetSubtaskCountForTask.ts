import HTTPRequestCommand from "../HTTPRequestCommand";
import ApplicationState from "../../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";

class GetSubtaskCountForTask extends HTTPRequestCommand {
    protected taskId: string;
    private subtaskCount: number | undefined;

    public constructor(taskId: string) {
        super();
        this.taskId = taskId;
        this.subtaskCount = undefined;
    }

    protected async request(state: ApplicationState) {
        const url = `/task/count/${this.taskId}`;
        const response = await this.client.get(url);
        switch (response.status) {
            case HttpStatusCode.Ok:
                this.subtaskCount = parseInt(response.data);
                state.setSubtaskCount(this.subtaskCount);
                break;
            case HttpStatusCode.BadRequest:
                state.setErrorMessage("Request failed server-side validation");
                break;
            case HttpStatusCode.NotFound:
                state.setErrorMessage("Entity could not be found");
                break;
            default:
                throw new Error(`Network Error: ${response.status}`);
        }
    }

    protected syncLocal(state: ApplicationState) {
        state.setSubtaskCount(this.subtaskCount ?? 0);
    }
}

export default GetSubtaskCountForTask;
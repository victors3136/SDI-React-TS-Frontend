import HTTPRequestCommandBase from "../common/HTTPRequestCommandBase";
import ApplicationState from "../../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";

class GetSubtaskCountForTask extends HTTPRequestCommandBase {
    protected taskId: string;

    public constructor(taskId: string) {
        super();
        this.taskId = taskId;
    }

    request = (state: ApplicationState) =>
        this.client
            .get(`/task/count/${this.taskId}`)
            .then(response => {
                switch (response.status) {
                    case HttpStatusCode.Ok:
                        state.setSubtaskCount(response.data);
                        break;
                    case HttpStatusCode.BadRequest:
                        state.setErrorMessage("Request failed server-side validation");
                        break;
                    case HttpStatusCode.NotFound:
                        state.setErrorMessage("Entity could not be found");
                        break;
                    default:
                        throw new Error(`Unhandled response code: ${response.status}`);
                }
            })
            .catch(err => this.handleError(state, err));
    localSync = (state: ApplicationState) => {
        console.log("No children could be ");
    }
}
export default GetSubtaskCountForTask;
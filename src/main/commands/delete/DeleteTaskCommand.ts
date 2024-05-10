import HTTPRequestCommandBase from "../common/HTTPRequestCommandBase";
import ApplicationState from "../../../state/public/ApplicationStateType";
import removeTask from "../../../state/public/utils/removeTask";
import {HttpStatusCode} from "axios";

class DeleteTaskCommand extends HTTPRequestCommandBase {
    protected taskID: string;

    public constructor(taskID: string) {
        super();
        this.taskID = taskID;
    }

    request = (state: ApplicationState) =>
        this.client
            .delete(`/task/${this.taskID}`)
            .then(response => {
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
                        throw new Error(`Unhandled response code: ${response.status}`);
                }
                this.syncAndCleanup(state);
            })
            .catch(err => this.handleError(state, err));

    syncAndCleanup = (state: ApplicationState) => {
        removeTask(state, this.taskID);
    }
}

export default DeleteTaskCommand;
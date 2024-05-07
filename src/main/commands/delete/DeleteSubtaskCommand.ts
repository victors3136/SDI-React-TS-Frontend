import HTTPRequestCommandBase from "../HTTPRequestCommandBase";
import ApplicationState from "../../state/interface-application-state-store";
import {HttpStatusCode} from "axios";
import removeTask from "../../state/utils/removeTask";
import removeSubtask from "../../state/utils/removeSubtask";

class DeleteSubtaskCommand extends HTTPRequestCommandBase {
    protected subtaskID: string;

    public constructor(subtaskID: string) {
        super();
        this.subtaskID = subtaskID;
    }

    request = (state: ApplicationState) =>
        this.client
            .delete(`/subtask/${this.subtaskID}`)
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
                this.localSync(state);
            })
            .catch(err => this.handleError(state, err));

    localSync = (state: ApplicationState) => {
        removeSubtask(state, this.subtaskID);
    }
}

export default DeleteSubtaskCommand;
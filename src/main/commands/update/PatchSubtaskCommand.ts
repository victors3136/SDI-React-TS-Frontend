import HTTPRequestCommandBase from "../HTTPRequestCommandBase";
import ApplicationState from "../../state/interface-application-state-store";
import {HttpStatusCode} from "axios";
import editSubtask from "../../state/utils/editSubtask";
import ISubtask from "../../state/interface-subtask";

class PatchSubtaskCommand extends HTTPRequestCommandBase {
    protected baseSubtaskID: string;
    protected updatedSubtask: ISubtask;

    public constructor(baseSubtaskID: string, updatedSubtask: ISubtask) {
        super();
        this.baseSubtaskID = baseSubtaskID;
        this.updatedSubtask = updatedSubtask;
    }

    request = (state: ApplicationState) =>
        this.client
            .patch(`subtask/${this.baseSubtaskID}`, {data: this.updatedSubtask})
            .then(response => {
                switch (response.status) {
                    case HttpStatusCode.Ok:
                        editSubtask(state, this.updatedSubtask);
                        break;
                    case HttpStatusCode.BadRequest:
                        state.setErrorMessage("Request failed server-side validation");
                        break
                    case HttpStatusCode.NotFound:
                        state.setErrorMessage("Entry could not be found");
                        break;
                    default:
                        throw new Error(`Unhandled response code: ${response.status}`);
                }
            })
            .catch(err => this.handleError(state, err));
    localSync = (state: ApplicationState) => {
        editSubtask(state, this.updatedSubtask);
    }
}

export default PatchSubtaskCommand;
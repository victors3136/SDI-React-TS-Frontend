import HTTPRequestCommandBase from "../HTTPRequestCommandBase";
import ApplicationState from "../../state/interface-application-state-store";
import HTTPCode from "../../state/HTTPCode";
import removeTask from "../../state/utils/removeTask";

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
                    case HTTPCode.OK:
                        break;
                    case HTTPCode.BAD_REQUEST:
                        state.setErrorMessage("Request failed server-side validation");
                        break;
                    case HTTPCode.NOT_FOUND:
                        state.setErrorMessage("Entry could not be found");
                        break;
                    default:
                        throw new Error(`Unhandled response code: ${response.status}`);
                }
                this.localSync(state);
            })
            .catch(err => this.handleError(state, err));

    localSync = (state: ApplicationState) => {
        removeTask(state, this.taskID);
    }
}

export default DeleteTaskCommand;
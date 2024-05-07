import HTTPRequestCommandBase from "../HTTPRequestCommandBase";
import ApplicationState from "../../state/interface-application-state-store";
import HTTPCode from "../../state/HTTPCode";
import removeTasks from "../../state/utils/removeTasks";

class DeleteTaskCommand extends HTTPRequestCommandBase {
    protected taskIDS: string[];

    public constructor(taskIDS: string[]) {
        super();
        this.taskIDS = taskIDS;
    }

    request = (state: ApplicationState) =>
        this.client
            .delete('/task/batch', {data: this.taskIDS})
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
        removeTasks(state, this.taskIDS);
    }
}

export default DeleteTaskCommand;
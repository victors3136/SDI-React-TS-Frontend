import HTTPRequestCommandBase from "../HTTPRequestCommandBase";
import ApplicationState from "../../../state/public/ApplicationStateType";
import removeTasks from "../../../state/public/utils/removeTasks";
import {HttpStatusCode} from "axios";
import {clearIDSelection} from "../../../state/public/utils/clearIDSelection";

class DeleteTaskCommand extends HTTPRequestCommandBase {
    protected taskIDS: string[];

    public constructor(taskIDS: string[]) {
        super();
        this.taskIDS = taskIDS;
    }

    request = (state: ApplicationState) =>
        (this.taskIDS.length === 0)
            ? console.log("No id selected")
            : this.client
                .delete('/task/batch', {data: this.taskIDS})
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
        removeTasks(state, this.taskIDS);
        clearIDSelection(state);
    }
}

export default DeleteTaskCommand;
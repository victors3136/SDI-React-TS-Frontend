import HTTPRequestCommandBase from "../common/HTTPRequestCommandBase";
import ApplicationState from "../../state/public/ApplicationStateType";
import removeTasks from "../../state/public/utils/removeTasks";
import {HttpStatusCode} from "axios";

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
        removeTasks(state, this.taskIDS);
    }
}

export default DeleteTaskCommand;
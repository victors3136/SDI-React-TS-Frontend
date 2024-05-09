import HTTPRequestCommandBase from "../common/HTTPRequestCommandBase";
import ITask from "../../../state/public/ITask";
import ApplicationState from "../../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";
import editTask from "../../../state/public/utils/editTask";

class PatchTaskCommand extends HTTPRequestCommandBase {
    protected baseTaskID: string;
    protected updatedTask: ITask;

    public constructor(baseTaskID: string, updatedTask: ITask) {
        super();
        this.baseTaskID = baseTaskID;
        this.updatedTask = updatedTask;
    }

    request = (state: ApplicationState) =>
        this.client
            .patch(`task/${this.baseTaskID}`, {data: this.updatedTask})
            .then(response => {
                switch (response.status) {
                    case HttpStatusCode.Ok:
                        editTask(state, this.updatedTask);
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
        editTask(state, this.updatedTask);
    }
}


export default PatchTaskCommand;
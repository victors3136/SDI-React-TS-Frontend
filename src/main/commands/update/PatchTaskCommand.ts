import HTTPRequestCommand from "../HTTPRequestCommand";
import ITask from "../../../state/public/ITask";
import ApplicationState from "../../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";
import editTask from "../../../state/public/utils/editTask";
import Task from "../../../state/hidden/Task";

class PatchTaskCommand extends HTTPRequestCommand {
    protected baseTaskID: string;
    protected updatedTask: ITask;

    public constructor(baseTaskID: string, updatedTask: ITask) {
        super();
        this.baseTaskID = baseTaskID;
        this.updatedTask = new Task({...updatedTask, id: baseTaskID});
    }

    protected async request(state: ApplicationState) {
        const url = `task/${this.baseTaskID}`;
        const payload = this.updatedTask;
        const response = await this.client.patch(url, payload);
        switch (response.status) {
            case HttpStatusCode.Ok:
                // editTask(state, this.updatedTask); -- should get handled by syncLocal
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
    }

    protected syncLocal(state: ApplicationState) {
        editTask(state, this.updatedTask);
    }
}


export default PatchTaskCommand;
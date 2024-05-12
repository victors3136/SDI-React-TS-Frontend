import HTTPRequestCommand from "../HTTPRequestCommand";
import ApplicationState from "../../../state/public/ApplicationStateType";
import removeTask from "../../../state/public/utils/removeTask";
import {HttpStatusCode} from "axios";

class DeleteTaskCommand extends HTTPRequestCommand {
    protected taskID: string;

    public constructor(taskID: string) {
        super();
        this.taskID = taskID;
    }

    protected async request(state: ApplicationState) {
        const url = `/task/${this.taskID}`;
        console.log(`requesting ${url}`);
        const response = await this.client.delete(url);
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
                throw new Error(`Network Error: ${response.status}`);
        }
    }

    protected syncLocal(state: ApplicationState) {
        removeTask(state, this.taskID);
    }
}

export default DeleteTaskCommand;
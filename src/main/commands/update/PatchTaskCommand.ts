import ITask from "../../../state/public/ITask";
import ApplicationState from "../../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";
import editTask from "../../../state/public/utils/editTask";
import Task from "../../../state/hidden/Task";
import IHTTPClient from "../../requests/public/IHTTPClient";
import {RetryableHTTPRequestCommand} from "../RetryableHTTPRequestCommand";
import {handleCommandResponseProblemStatus} from "../auxilliaries/handleCommandResponseProblemStatus";

class PatchTaskCommand extends RetryableHTTPRequestCommand {
    protected baseTaskID: string;
    protected updatedTask: ITask;

    public constructor(baseTaskID: string, updatedTask: ITask, client?: IHTTPClient) {
        super(client);
        this.baseTaskID = baseTaskID;
        this.updatedTask = new Task({...updatedTask, id: baseTaskID});
    }

    protected async request(state: ApplicationState) {
        const url = `task/${this.baseTaskID}`;
        const payload = this.updatedTask;
        const response = await this.client.patch(url, payload);
        if (response.status !== HttpStatusCode.Ok) {
            handleCommandResponseProblemStatus(response, state);
        }
    }

    protected syncLocal(state: ApplicationState) {
        editTask(state, this.updatedTask);
    }

    protected showEffectOnPageBeforeSendingToServer(): boolean {
        return true;
    }
}


export default PatchTaskCommand;
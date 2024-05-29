import ITask from "../../../state/public/ITask";
import Task from "../../../state/hidden/Task";
import {HttpStatusCode} from "axios";
import ApplicationState from "../../../state/public/ApplicationStateType";
import TaskBase from "../../../state/public/TaskBase";
import {RetryableHTTPRequestCommand} from "../RetryableHTTPRequestCommand";
import IHTTPClient from "../../requests/public/IHTTPClient";
import {handleCommandResponseProblemStatus} from "../auxilliaries/handleCommandResponseProblemStatus";

class PostTaskCommand extends RetryableHTTPRequestCommand {

    protected task: ITask;

    public constructor(data: TaskBase, client?: IHTTPClient) {
        super(client);
        this.task = new Task(data);
        console.log(this.task);
    }

    protected async request(state: ApplicationState) {
        const url = '/task';
        const response = await this.client.post(url, this.task);
        if (response.status === HttpStatusCode.Created) {
            const taskId = response.data;
            this.task = new Task({...this.task, id: taskId});
        } else {
            handleCommandResponseProblemStatus(response, state);
        }
    }

    protected syncLocal(state: ApplicationState) {
        state.addTask(this.task);
    }

    protected showEffectOnPageBeforeSendingToServer(): boolean {
        return false;
    }

}

export default PostTaskCommand;
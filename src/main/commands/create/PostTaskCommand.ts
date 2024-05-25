import ITask from "../../../state/public/ITask";
import Task from "../../../state/hidden/Task";
import {HttpStatusCode} from "axios";
import ApplicationState from "../../../state/public/ApplicationStateType";
import TaskBase from "../../../state/public/TaskBase";
import {RetryableHTTPRequestCommand} from "../RetryableHTTPRequestCommand";
import IHTTPClient from "../../requests/public/IHTTPClient";

class PostTaskCommand extends RetryableHTTPRequestCommand {

    protected task: ITask;

    public constructor(data: TaskBase, client?: IHTTPClient) {
        super(client);
        this.task = new Task(data);
    }

    protected async request(state: ApplicationState) {
        const url = '/task';
        const response = await this.client.post(url, this.task);
        switch (response.status) {
            case HttpStatusCode.Created:
                const taskId = response.data;
                this.task = new Task({...this.task, id: taskId})
                break;
            case HttpStatusCode.BadRequest:
                state.setErrorMessage('Server-side validation failed');
                break;
            default:
                throw new Error(`Network Error: ${response.status}`);
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
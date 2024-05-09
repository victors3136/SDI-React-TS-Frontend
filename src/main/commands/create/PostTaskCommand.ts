import ITask from "../../../state/public/ITask";
import Task from "../../../state/hidden/Task";
import {AxiosResponse, HttpStatusCode} from "axios";
import ApplicationState from "../../../state/public/ApplicationStateType";
import addTaskToState from "../../../state/public/utils/addTaskToState";
import HTTPRequestCommandBase from "../common/HTTPRequestCommandBase";
import TaskBase from "../../../state/public/TaskBase";

class PostTaskCommand extends HTTPRequestCommandBase {
    protected task: ITask;

    public constructor(data: TaskBase) {
        super();
        this.task = new Task(data);
    }

    request(state: ApplicationState) {
        this.client
            .post('/task', this.task)
            .then((response: AxiosResponse<{ id: string }>) => {
                switch (response.status) {
                    case HttpStatusCode.Created:
                        this.task = new Task({
                            id: response.data.id,
                            name: this.task.name,
                            description: this.task.description ?? "",
                            priority: this.task.priority,
                            dueDate: this.task.dueDate
                        });
                        break;
                    case HttpStatusCode.BadRequest:
                        state.setErrorMessage("Request failed server-side validation");
                        break;
                    default:
                        throw new Error(`Unhandled response code: ${response.status}`);
                }
                state.setServerDown(false);
            })
            .catch(err => this.handleError(state, err))
            .finally(() => this.syncIfNotRetrying(state));
    };

    localSync = (state: ApplicationState) => addTaskToState(state, this.task);
}

export default PostTaskCommand;
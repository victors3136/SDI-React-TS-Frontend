import ITask from "../../state/interface-task";
import Task from "../../state/task";
import {AxiosResponse, HttpStatusCode} from "axios";
import ApplicationState from "../../state/interface-application-state-store";
import addTaskToState from "../../state/utils/addTaskToState";
import HTTPRequestCommandBase from "../HTTPRequestCommandBase";

class PostTaskCommand extends HTTPRequestCommandBase {
    protected task: ITask;

    public constructor(data: object) {
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
                            description: this.task.description,
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
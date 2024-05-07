import ITask from "../state/interface-task";
import Task from "../state/task";
import {AxiosResponse} from "axios";
import ApplicationState from "../state/interface-application-state-store";
import addTaskToState from "../state/utils/addTaskToState";
import HTTPRequestCommandBase from "./HTTPRequestCommandBase";

class AddTaskCommand extends HTTPRequestCommandBase {
    private task: ITask;

    public constructor(data: object) {
        super();
        this.task = new Task(data);
    }

    execute(state: ApplicationState) {
        this.client
            .post('/task', this.task)
            .then((response: AxiosResponse<{ id: number }>) => {
                this.task = new Task({
                    id: response.data.id,
                    name: this.task.name,
                    description: this.task.description,
                    priority: this.task.priority,
                    dueDate: this.task.dueDate
                });
                state.setServerDown(false);
                addTaskToState(state, this.task);
            })
            .catch(err => this.handleError(state, err));
    };
}

export default AddTaskCommand;
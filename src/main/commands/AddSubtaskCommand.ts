import ApplicationState from "../state/interface-application-state-store";
import ISubtask from "../state/interface-subtask";
import Subtask from "../state/subtask";
import addSubtaskToState from "../state/utils/addSubtaskToState";
import HTTPRequestCommandBase from "./HTTPRequestCommandBase";
import {AxiosResponse} from "axios";

class AddSubtaskCommand extends HTTPRequestCommandBase {
    private subtask: ISubtask;

    public constructor(data: object) {
        super();
        this.subtask = new Subtask(data);
    }

    public execute = (state: ApplicationState) =>
        this.client
            .post('/task', this.subtask)
            .then((response: AxiosResponse<{ id: number }>) => {
                this.subtask = new Subtask({
                    id: response.data.id,
                    subject: this.subtask.subject,
                    task: this.subtask.task,
                });
                state.setServerDown(false);
                addSubtaskToState(state, this.subtask);
            })
            .catch(err => this.handleError(state, err));
}

export default AddSubtaskCommand;
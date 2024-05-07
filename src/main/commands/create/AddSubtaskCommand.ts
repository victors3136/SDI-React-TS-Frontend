import ApplicationState from "../../state/interface-application-state-store";
import ISubtask from "../../state/interface-subtask";
import Subtask from "../../state/subtask";
import addSubtaskToState from "../../state/utils/addSubtaskToState";
import HTTPRequestCommandBase from "../HTTPRequestCommandBase";
import {AxiosResponse} from "axios";
import subtask from "../../state/subtask";

class AddSubtaskCommand extends HTTPRequestCommandBase {
    private subtask: ISubtask;

    public constructor(data: object) {
        super();
        this.subtask = new Subtask(data);
    }

    request = (state: ApplicationState) =>
        this.client
            .post('/task', this.subtask)
            .then((response: AxiosResponse<{ id: number }>) => {
                this.subtask = new Subtask({
                    id: response.data.id,
                    subject: this.subtask.subject,
                    task: this.subtask.task,
                });
                state.setServerDown(false);
                this.localSync(state);
            })
            .catch(err => this.handleError(state, err))
            .finally(() => this.syncIfNotRetrying(state));

    localSync = (state: ApplicationState) => addSubtaskToState(state, this.subtask)
}

export default AddSubtaskCommand;
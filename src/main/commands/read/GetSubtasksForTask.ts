import HTTPRequestCommand from "../HTTPRequestCommand";
import ApplicationState from "../../../state/public/ApplicationStateType";
import axios, {HttpStatusCode} from "axios";
import Subtask from "../../../state/hidden/Subtask";
import SubtaskBase from "../../../state/public/SubtaskBase";
import ISubtask from "../../../state/public/ISubtask";
import IHTTPClient from "../../requests/public/IHTTPClient";
import {handleCommandResponseProblemStatus} from "../auxilliaries/handleCommandResponseProblemStatus";

class GetSubtasksForTask extends HTTPRequestCommand {
    protected taskId: string;
    protected subtasks: ISubtask[];

    public constructor(taskId: string, client?: IHTTPClient) {
        super(client);
        this.taskId = taskId;
        this.subtasks = [];
    }

    public async execute(state: ApplicationState) {
        if (HTTPRequestCommand.serverIsDown) {
            state.setSubtasks([]);
            return;
        }
        const url = `/subtask/for/${this.taskId}`;
        let response;
        try {
            response = await this.client.get(url);
        } catch (error) {
            if (axios.isAxiosError(error) && !error.response) {
                state.setErrorMessage("Server seems to be down :(\n Keeping a local session for now...");
                HTTPRequestCommand.serverIsDown = true;
            } else if (axios.isAxiosError(error) && error.response) {
                handleCommandResponseProblemStatus({status: error.response.status}, state);
            } else {
                state.setErrorMessage("Unexpected error occurred");
            }
            return;
        }
        if (response.status === HttpStatusCode.Ok) {
            this.subtasks = response.data.map((jsonChunk: SubtaskBase) => new Subtask(jsonChunk));
            state.setSubtasks(this.subtasks);
        } else {
            handleCommandResponseProblemStatus(response, state);
        }
    }
}

export default GetSubtasksForTask;
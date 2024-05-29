import HTTPRequestCommand from "../HTTPRequestCommand";
import ApplicationState from "../../../state/public/ApplicationStateType";
import axios, {HttpStatusCode} from "axios";
import IHTTPClient from "../../requests/public/IHTTPClient";
import {handleCommandResponseProblemStatus} from "../auxilliaries/handleCommandResponseProblemStatus";

class GetSubtaskCountForTask extends HTTPRequestCommand {
    protected taskId: string;
    private subtaskCount: number | undefined;

    public constructor(taskId: string, client?: IHTTPClient) {
        super(client);
        this.taskId = taskId;
        this.subtaskCount = undefined;
    }

    public async execute(state: ApplicationState) {
        if (HTTPRequestCommand.serverIsDown) {
            state.setSubtaskCount(-1);
            return;
        }
        const url = `/subtask/count/${this.taskId}`;
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
            this.subtaskCount = parseInt(response.data);
            state.setSubtaskCount(this.subtaskCount);
        } else {
            handleCommandResponseProblemStatus(response, state);
        }
    }
}

export default GetSubtaskCountForTask;
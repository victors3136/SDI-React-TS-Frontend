import HTTPRequestCommand from "../HTTPRequestCommand";
import ApplicationState from "../../../state/public/ApplicationStateType";
import Task from "../../../state/hidden/Task";
import ITask from "../../../state/public/ITask";
import TaskBase from "../../../state/public/TaskBase";
import axios, {HttpStatusCode} from "axios";
import IHTTPClient from "../../requests/public/IHTTPClient";

import {handleCommandResponseProblemStatus} from "../auxilliaries/handleCommandResponseProblemStatus";

class GetTaskPageCommand extends HTTPRequestCommand {
    protected pageNumber: number;

    public constructor(pageNum?: number, client?: IHTTPClient) {
        super(client);
        this.pageNumber = pageNum ?? 0;
    }

    public async execute(state: ApplicationState) {
        const url = '/task/all';
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
            console.log(response);
            const list: ITask[] = response.data.map((jsonChunk: TaskBase) => new Task(jsonChunk));
            state.addTasks(list);
            state.incrementPageCounter();
            state.setMorePagesAvailable(list.length !== 0);
        } else {
            handleCommandResponseProblemStatus(response, state);
        }
    }
}

export default GetTaskPageCommand;
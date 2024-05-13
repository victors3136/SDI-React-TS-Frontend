import HTTPRequestCommand from "../HTTPRequestCommand";
import ApplicationState from "../../../state/public/ApplicationStateType";
import Task from "../../../state/hidden/Task";
import ITask from "../../../state/public/ITask";
import TaskBase from "../../../state/public/TaskBase";
import {HttpStatusCode} from "axios";
import IHTTPClient from "../../requests/public/IHTTPClient";

class GetTaskPageCommand extends HTTPRequestCommand {
    protected pageNumber: number;

    public constructor(pageNum?: number, client?: IHTTPClient) {
        super(client);
        this.pageNumber = pageNum ?? 0;
    }

    public async execute(state: ApplicationState) {
        if (HTTPRequestCommand.serverIsDown) {
            state.setMorePagesAvailable(false);
            return;
        }
        const url = `/task/all/${this.pageNumber}`;
        console.log(`requesting ${url}`);
        let response
        try {
            response = await this.client.get(url);
        } catch (_error) {
            state.setErrorMessage("Service unavailable");
            HTTPRequestCommand.serverIsDown = true;
            return;
        }
        if (response.status === HttpStatusCode.Ok) {
            const list: ITask[] = response.data.content.map((jsonChunk: TaskBase) => new Task(jsonChunk));
            state.addTasks(list);
            state.incrementPageCounter();
            state.setMorePagesAvailable(list.length !== 0);
        } else {
            state.setErrorMessage("Service unavailable");
            HTTPRequestCommand.serverIsDown = true;
        }
    }
}

export default GetTaskPageCommand;
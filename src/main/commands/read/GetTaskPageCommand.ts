import HTTPRequestCommand from "../HTTPRequestCommand";
import ApplicationState from "../../../state/public/ApplicationStateType";
import Task from "../../../state/hidden/Task";
import ITask from "../../../state/public/ITask";
import TaskBase from "../../../state/public/TaskBase";
import {HttpStatusCode} from "axios";

class GetTaskPageCommand extends HTTPRequestCommand {
    protected pageNumber: number;

    public constructor(pageNum?: number) {
        super();
        this.pageNumber = pageNum ?? 0;
    }

    protected async request(state: ApplicationState) {
        const url = `/task/all/${this.pageNumber}`;
        const response = await this.client.get(url);
        if (response.status === HttpStatusCode.Ok) {
            const list: ITask[] = response.data.content.map((jsonChunk: TaskBase) => new Task(jsonChunk));
            state.addTasks(list);
            state.incrementPageCounter();
            state.setMorePagesAvailable(list.length !== 0);
        } else {
            throw new Error(`Network Error: ${response.status}`);
        }
    }

    protected syncLocal(state: ApplicationState) {
        state.setMorePagesAvailable(HTTPRequestCommand.serverDown);
    }
}

export default GetTaskPageCommand;
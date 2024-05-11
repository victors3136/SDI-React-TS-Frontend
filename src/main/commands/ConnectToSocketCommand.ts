import ICommand from "./ICommand";
import ApplicationState from "../../state/public/ApplicationStateType";
import {Stomp} from '@stomp/stompjs';
import Task from "../../state/hidden/Task";
import TaskBase from "../../state/public/TaskBase";
import addTaskToState from "../../state/public/utils/addTaskToState";

class ConnectToSocketCommand implements ICommand {
    public execute = (state: ApplicationState) => {
        if (!process.env.REACT_APP_BACKEND_SOCKET_URL) {
            return;
        }
        const url = process.env.REACT_APP_BACKEND_SOCKET_URL;
        const stompClient = Stomp.over(() => new WebSocket(url));
        stompClient.connect({}, () => {
            stompClient.subscribe("/topic/newEntry", (message: { body: string }) => {
                const taskBase: TaskBase = JSON.parse(message.body);
                const task = new Task(taskBase);
                addTaskToState(state, task);
            });
        });
    }
}

export default ConnectToSocketCommand;
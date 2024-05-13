import ICommand from "./ICommand";
import ApplicationState from "../../state/public/ApplicationStateType";
import {Client} from '@stomp/stompjs';
import Task from "../../state/hidden/Task";
import TaskBase from "../../state/public/TaskBase";
import addTaskToState from "../../state/public/utils/addTaskToState";
import ITask from "../../state/public/ITask";

class ConnectToSocketCommand implements ICommand {
    public execute = (state: ApplicationState) => {
        if (!process.env.REACT_APP_BACKEND_SOCKET_URL) {
            console.warn("No url specified for the websocket");
            return;
        }
        if (!process.env.REACT_APP_BACKEND_SOCKET_ENDPOINT) {
            console.warn("No endpoint specified for the websocket");
            return;
        }
        const url = process.env.REACT_APP_BACKEND_SOCKET_URL;
        const endpoint = process.env.REACT_APP_BACKEND_SOCKET_ENDPOINT;
        const webSocketFactoryFunction = () => new WebSocket(url);
        const parseAndDisplay = (data: { body: string }) => {
            const payload: string = data.body;
            const taskBase: TaskBase = JSON.parse(payload);
            const task: ITask = new Task(taskBase);
            addTaskToState(state, task);
        }
        const socketClient = new Client({webSocketFactory: webSocketFactoryFunction});
        socketClient.onConnect = () => socketClient.subscribe(endpoint, parseAndDisplay);
        socketClient.activate();
    }
}

export default ConnectToSocketCommand;
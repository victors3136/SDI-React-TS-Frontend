import ICommand from "./ICommand";
import ApplicationState from "../../state/public/ApplicationStateType";
import {Client} from '@stomp/stompjs';
import Task from "../../state/hidden/Task";
import addTaskToState from "../../state/public/utils/addTaskToState";

class ConnectToSocketCommand implements ICommand {
    public execute = (state: ApplicationState) => {
        if (!process.env.REACT_APP_BACKEND_SOCKET_URL) {
            window.alert("No url specified for the websocket");
            return;
        }
        if (!process.env.REACT_APP_BACKEND_SOCKET_ENDPOINT) {
            window.alert("No endpoint specified for the websocket");
            return;
        }
        const url = process.env.REACT_APP_BACKEND_SOCKET_URL;
        const endpoint = process.env.REACT_APP_BACKEND_SOCKET_ENDPOINT;
        const webSocketFactory = () => new WebSocket(url);
        const parseAndSaveLocally = (data: { body: string }) =>
            addTaskToState(state, new Task(JSON.parse(data.body)));
        const socketClient = new Client({webSocketFactory});
        socketClient.onConnect = () => socketClient.subscribe(endpoint, parseAndSaveLocally);
        socketClient.activate();
    }
}

export default ConnectToSocketCommand;
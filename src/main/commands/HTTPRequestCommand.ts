import IHTTPClient from "../requests/public/IHTTPClient";
import ApplicationState from "../../state/public/ApplicationStateType";
import ICommand from "./ICommand";
import AxiosHTTPClientAdapter from "../requests/public/AxiosHTTPClientAdapter";


abstract class HTTPRequestCommand implements ICommand {

    protected client: IHTTPClient;

    protected static serverIsDown: boolean = false;

    protected constructor(client?: IHTTPClient) {
        this.client = client ?? AxiosHTTPClientAdapter.instantiate();
    }

    abstract execute(state: ApplicationState): void;

}

export default HTTPRequestCommand;
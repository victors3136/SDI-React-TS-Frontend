import IHTTPClient from "../requests/public/IHTTPClient";
import ApplicationState from "../../state/public/ApplicationStateType";
import ICommand from "./ICommand";
import AxiosHTTPClientAdapter from "../requests/public/AxiosHTTPClientAdapter";

abstract class HTTPRequestCommand implements ICommand {

    protected client: IHTTPClient;
    private isFirstTry: boolean;

    protected constructor(client?: IHTTPClient) {
        this.client = client ?? AxiosHTTPClientAdapter.instantiate();
        this.isFirstTry = true;
    }

    protected abstract request(state: ApplicationState): Promise<any>;

    protected abstract syncLocal(state: ApplicationState): void;

    async execute(state: ApplicationState) {
        if (HTTPRequestCommand.serverDown) {
            if (this.isFirstTry) {
                this.syncLocal(state);
                this.isFirstTry = false;
            }
            HTTPRequestCommand.enqueue(this, state);
            return;
        }
        try {
            await this.request(state);
        } catch (error) {
            HTTPRequestCommand.enqueue(this, state);
            HTTPRequestCommand.serverDown = true;
            state.setErrorMessage("Server seems to be down :(\n Keeping a local session for now...");
            return;
        }
        if (this.isFirstTry) {
            this.syncLocal(state);
        }
    }

    private static requestQueue: HTTPRequestCommand[] = [];
    private static isBusy = false;

    protected static serverDown: boolean = false;

    protected static enqueue(command: HTTPRequestCommand, state: ApplicationState) {
        command.isFirstTry = false;
        HTTPRequestCommand.requestQueue.push(command);
        HTTPRequestCommand.retry(state);
    }

    private static async retry(state: ApplicationState) {
        if (!HTTPRequestCommand.isBusy && HTTPRequestCommand.requestQueue.length > 0) {
            HTTPRequestCommand.isBusy = true;
            const current = HTTPRequestCommand.requestQueue[0];
            try {
                await current.execute(state);
                HTTPRequestCommand.requestQueue.shift();
                HTTPRequestCommand.serverDown = false;
            } catch (_error) {
            } finally {
                HTTPRequestCommand.isBusy = false;
                HTTPRequestCommand.retry(state);
            }
        }
    }
}

export default HTTPRequestCommand;
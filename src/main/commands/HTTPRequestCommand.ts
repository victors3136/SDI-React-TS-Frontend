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
        this.syncLocal(state);
        if (HTTPRequestCommand.serverDown) {
            HTTPRequestCommand.enqueue(this, state);
            return;
        }
        try {
            await this.request(state);
        } catch (error) {

            HTTPRequestCommand.enqueue(this, state);

            if (!HTTPRequestCommand.serverDown) {
                HTTPRequestCommand.serverDown = true;
                state.setErrorMessage("Server seems to be down :(\n Keeping a local session for now...");
            }
        }
    }

    private static requestQueue: HTTPRequestCommand[] = [];
    private static isBusy = false;

    protected static serverDown: boolean = false;

    protected static enqueue(command: HTTPRequestCommand, state: ApplicationState) {
        HTTPRequestCommand.requestQueue.push(command);
        HTTPRequestCommand.retry(state);
    }

    private static retryDelay = 1_000 /*milliseconds*/;

    private static async retry(state: ApplicationState) {
        if (HTTPRequestCommand.isBusy) {
            return;
        }
        if (HTTPRequestCommand.requestQueue.length <= 0) {
            return;
        }
        HTTPRequestCommand.isBusy = true;
        while (HTTPRequestCommand.requestQueue.length > 0) {
            const current = HTTPRequestCommand.requestQueue[0];
            try {
                await current.request(state);
                console.log("Reestablishing connection successful :). Moving on...");
                HTTPRequestCommand.requestQueue.shift();
                HTTPRequestCommand.serverDown = false;
                HTTPRequestCommand.retryDelay = 1_000;
            } catch (error) {
                console.log(`Reestablishing connection failed -- waiting for ${HTTPRequestCommand.retryDelay} milliseconds`);
                await new Promise(resolve => setTimeout(resolve, HTTPRequestCommand.retryDelay));
                HTTPRequestCommand.retryDelay *= 1.5; // Do a 'gentle' exponential backoff :)
            }
        }
        HTTPRequestCommand.isBusy = false;
    }
}

export default HTTPRequestCommand;
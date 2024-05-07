import IHTTPClient from "../requests/IHTTPClient";
import AxiosHTTPClientAdapter from "../requests/AxiosHTTPClientAdapter";
import ApplicationState from "../state/interface-application-state-store";
import ICommand from "./ICommand";

abstract class HTTPRequestCommandBase implements ICommand {

    private static readonly retryInterval: number = 5_000;

    protected client: IHTTPClient;

    protected constructor() {
        this.client = AxiosHTTPClientAdapter.instantiate();
    }

    public abstract execute(state: ApplicationState): void;

    protected handleError(state: ApplicationState, err: Error) {
        if (!state.serverDown) {
            state.setErrorMessage(err.message);
            state.setServerDown(true);
        }
        this.retry(state);
    }

    private retry(state: ApplicationState) {
        const retryInterval = setInterval(() => {
            this.execute(state);
            if (!state.serverDown) {
                clearInterval(retryInterval);
            }
        }, HTTPRequestCommandBase.retryInterval);
    };
}

export default HTTPRequestCommandBase;
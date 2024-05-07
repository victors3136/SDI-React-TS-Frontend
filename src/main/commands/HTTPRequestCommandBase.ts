import IHTTPClient from "../requests/IHTTPClient";
import AxiosHTTPClientAdapter from "../requests/AxiosHTTPClientAdapter";
import ApplicationState from "../state/interface-application-state-store";
import ICommand from "./ICommand";

abstract class HTTPRequestCommandBase implements ICommand {

    private static readonly retryInterval: number = 5_000;

    protected client: IHTTPClient;
    protected retrying: boolean;

    protected constructor() {
        this.client = AxiosHTTPClientAdapter.instantiate();
        this.retrying = false;
    }

    public execute = (state: ApplicationState) =>
        (!state.serverDown)
            ? this.request(state)
            : this.retry(state);

    public abstract request(state: ApplicationState): void;

    protected handleError(state: ApplicationState, err: Error) {
        if (!state.serverDown) {
            state.setErrorMessage(err.message);
            state.setServerDown(true);
        }
        this.retry(state);
    }

    protected retry(state: ApplicationState) {
        if (this.retrying) {
            return;
        }
        this.retrying = true;
        const retryInterval = setInterval(() => {
            this.request(state);
            if (!state.serverDown) {
                clearInterval(retryInterval);
            }
        }, HTTPRequestCommandBase.retryInterval);
    };

    protected syncIfNotRetrying = (state: ApplicationState) => {
        if (!this.retrying) {
            this.localSync(state);
        }
    }

    protected abstract localSync: (state: ApplicationState) => void;
}

export default HTTPRequestCommandBase;
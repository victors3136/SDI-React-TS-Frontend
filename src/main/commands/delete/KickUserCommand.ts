import {RetryableHTTPRequestCommand} from "../RetryableHTTPRequestCommand";
import IHTTPClient from "../../requests/public/IHTTPClient";
import ApplicationState from "../../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";
import {handleCommandResponseProblemStatus} from "../auxilliaries/handleCommandResponseProblemStatus";
import removeUser from "../../../state/public/utils/removeUser";

class KickUserCommand extends RetryableHTTPRequestCommand {
    protected userID: string;

    public constructor(userID: string, client?: IHTTPClient) {
        super(client);
        this.userID = userID;
    }

    protected async request(state: ApplicationState) {
        const url = `/user/kick/${this.userID}`;
        console.log("url");
        const response = await this.client.delete(url);
        if (response.status !== HttpStatusCode.NoContent) {
            handleCommandResponseProblemStatus(response, state);
        }
    }

    protected syncLocal(state: ApplicationState) {
        removeUser(state, this.userID);
    }

    protected showEffectOnPageBeforeSendingToServer(): boolean {
        return true;
    }
}

export default KickUserCommand;
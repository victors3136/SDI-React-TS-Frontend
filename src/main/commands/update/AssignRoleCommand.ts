import {RetryableHTTPRequestCommand} from "../RetryableHTTPRequestCommand";
import IHTTPClient from "../../requests/public/IHTTPClient";
import ApplicationState from "../../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";
import {handleCommandResponseProblemStatus} from "../auxilliaries/handleCommandResponseProblemStatus";
import updateUserRole from "../../../state/public/utils/updateUserRole";

class AssignRoleCommand extends RetryableHTTPRequestCommand {
    protected userId: string;
    protected roleName: string;

    public constructor(userId: string, roleName: string, client?: IHTTPClient) {
        super(client);
        this.userId = userId;
        this.roleName = roleName;
    }

    protected async request(state: ApplicationState) {
        const url = 'user/modify';
        const payload = {id: this.userId, role: this.roleName};
        const response = await this.client.patch(url, payload);
        if (response.status !== HttpStatusCode.Ok) {
            handleCommandResponseProblemStatus(response, state);
        }
    }

    protected syncLocal(state: ApplicationState) {
        updateUserRole(state, this.userId, this.roleName);
    }

    protected showEffectOnPageBeforeSendingToServer(): boolean {
        return true;
    }
}
export default AssignRoleCommand;
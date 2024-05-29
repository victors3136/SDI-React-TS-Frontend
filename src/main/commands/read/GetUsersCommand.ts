import HTTPRequestCommand from "../HTTPRequestCommand";
import ApplicationState from "../../../state/public/ApplicationStateType";
import axios, {HttpStatusCode} from "axios";
import IHTTPClient from "../../requests/public/IHTTPClient";
import {handleCommandResponseProblemStatus} from "../auxilliaries/handleCommandResponseProblemStatus";
import {SimpleUser} from "../../../state/public/SimpleUser";

class GetUsersCommand extends HTTPRequestCommand {

    private users: SimpleUser[];

    public constructor(client?: IHTTPClient) {
        super(client);
        this.users = [];
    }

    public async execute(state: ApplicationState) {
        if (HTTPRequestCommand.serverIsDown) {
            state.setUsers([]);
            return;
        }
        const url = `/user/all`;
        let response;
        try {
            response = await this.client.get(url);
        } catch (error) {
            if (axios.isAxiosError(error) && !error.response) {
                state.setErrorMessage("Server seems to be down :(\n Keeping a local session for now...");
                HTTPRequestCommand.serverIsDown = true;
            } else if (axios.isAxiosError(error) && error.response) {
                handleCommandResponseProblemStatus({status: error.response.status}, state);
            } else {
                state.setErrorMessage("Unexpected error occurred");
            }
            return;
        }
        if (response.status === HttpStatusCode.Ok) {
            this.users = response.data.map((jsonChunk: SimpleUser) => {
                return {username: jsonChunk.username, role: jsonChunk.role, id: jsonChunk.id}
            });
            state.setUsers(this.users);
        } else {
            handleCommandResponseProblemStatus(response, state);
        }
    }
}

export default GetUsersCommand;
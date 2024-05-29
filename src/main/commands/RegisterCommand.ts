import HTTPRequestCommand from "./HTTPRequestCommand";
import IHTTPClient from "../requests/public/IHTTPClient";
import ApplicationState from "../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";
import IUser from "../../state/public/IUser";
import UserBase from "../../state/public/UserBase";
import User from "../../state/hidden/User";
import {LoginCommand} from "./LoginCommand";
import {handleCommandResponseProblemStatus} from "./auxilliaries/handleCommandResponseProblemStatus";


export class RegisterCommand extends HTTPRequestCommand {
    private readonly user: IUser;

    public constructor(basis: UserBase, client?: IHTTPClient) {
        super(client);
        this.user = new User(basis);
    }

    async execute(state: ApplicationState) {
        const url = '/user/register';
        const registerRequestBody = this.user;
        let response: { data: string, status: number };
        response = await this.client.post(url, registerRequestBody);
        if (!response.data) {
            state.setErrorMessage("Response has no body? This is strange...");
            return;
        }
        if (response.status === HttpStatusCode.Ok) {
            new LoginCommand({username: this.user.username, password: this.user.password}).execute(state);
        } else {
            handleCommandResponseProblemStatus(response, state);
        }
    }
}
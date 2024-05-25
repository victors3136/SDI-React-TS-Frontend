import HTTPRequestCommand from "./HTTPRequestCommand";
import IHTTPClient from "../requests/public/IHTTPClient";
import ApplicationState from "../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";
import IUser from "../../state/public/IUser";
import UserBase from "../../state/public/UserBase";
import User from "../../state/hidden/User";
import {LoginCommand} from "./LoginCommand";


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
        switch (response.status) {
            case HttpStatusCode.Ok:
                new LoginCommand({username: this.user.username, password: this.user.password}).execute(state);
                break;
            case HttpStatusCode.Unauthorized:
                state.setErrorMessage("Username is already taken");
                break;
            default:
                state.setErrorMessage(
                    `Unhandled response status --
                               ${response.status}\n
                               ${response.data}`);
        }
    }
}
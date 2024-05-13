import HTTPRequestCommand from "./HTTPRequestCommand";
import IHTTPClient from "../requests/public/IHTTPClient";
import ApplicationState from "../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";
import IUser from "../../state/public/IUser";
import UserBase from "../../state/public/UserBase";
import User from "../../state/hidden/User";


export class RegisterCommand extends HTTPRequestCommand {
    private readonly user: IUser;

    public constructor(basis: UserBase, client?: IHTTPClient) {
        super(client);
        this.user = new User(basis);
    }

    async execute(state: ApplicationState) {
        const url = '/user/register';
        console.log(url);
        const registerRequestBody = this.user;
        let response: { body: string, status: number };
        try {
            response = await this.client.post(url, registerRequestBody);
        } catch (_error) {
            state.setErrorMessage("Connection to the server and password validation failed...\nTry again later");
            return;
        }
        if (!response.body) {
            state.setErrorMessage("Response has no body? This is strange...");
            return;
        }
        switch (response.status) {
            case HttpStatusCode.Ok:
                break;
            case HttpStatusCode.Unauthorized:
                state.setErrorMessage(response.body);
                break;
            default:
                state.setErrorMessage(`Unhandled response status -- ${response.status}\n${response.body}`);
        }
    }
}
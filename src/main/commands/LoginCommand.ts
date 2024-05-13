import HTTPRequestCommand from "./HTTPRequestCommand";
import IHTTPClient from "../requests/public/IHTTPClient";
import ApplicationState from "../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";

interface LoginRequestBase {
    get username(): string;

    get password(): string;
}

export class LoginCommand extends HTTPRequestCommand {
    private readonly username: string;
    private readonly password: string;

    public constructor(basis: LoginRequestBase, client?: IHTTPClient) {
        super(client);
        this.username = basis.username;
        this.password = basis.password;
    }

    async execute(state: ApplicationState) {
        const url = '/user/login';
        console.log(url);
        const loginRequestBody: LoginRequestBase = {username: this.username, password: this.password};
        let response: { body: string, status: number };
        try {
            response = await this.client.post(url, loginRequestBody);
        } catch (_exception) {
            state.setErrorMessage("Connection to the server and password validation failed...\nTry again later");
            return;
        }
        if (!response.body) {
            state.setErrorMessage("Response has no body? This is strange...");
            return;
        }
        switch (response.status) {
            case HttpStatusCode.Ok:
                state.setJSONWebToken(response.body);
                break;
            case HttpStatusCode.Unauthorized:
                state.setErrorMessage(response.body);
                break;
            default:
                state.setErrorMessage(`Unhandled response status -- ${response.status}\n${response.body}`);
        }
    }
}
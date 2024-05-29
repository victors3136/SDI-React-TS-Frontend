import HTTPRequestCommand from "./HTTPRequestCommand";
import IHTTPClient from "../requests/public/IHTTPClient";
import ApplicationState from "../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";
import {handleCommandResponseProblemStatus} from "./auxilliaries/handleCommandResponseProblemStatus";

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
        const loginRequestBody: LoginRequestBase = {username: this.username, password: this.password};
        let response: { data: { token: string, permissions: string[], id: string }, status: number };
        try {
            response = await this.client.post(url, loginRequestBody);
        } catch (error) {
            state.setErrorMessage("Wrong username or password");
            return;
        }
        if (response.status === HttpStatusCode.Ok) {
            const {token, permissions, id} = response.data;
            state.setUserID(id);
            state.setJSONWebToken(token);
            state.setPermissions(permissions);
            localStorage.setItem('jwt', token);
            state.setLoginComplete(true);
        } else {
            handleCommandResponseProblemStatus(response, state);
        }
    }
}
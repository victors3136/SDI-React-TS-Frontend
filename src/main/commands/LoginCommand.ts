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
        let response: { data: string, status: number };
        try {
            response = await this.client.post(url, loginRequestBody);
        } catch (error) {
            state.setErrorMessage("Wrong username or password");
            return;
        }
        console.log(response);

        if (response.status === HttpStatusCode.Ok) {
            state.setJSONWebToken(response.data);
            localStorage.setItem('jwt', response.data);
        }
    }
}
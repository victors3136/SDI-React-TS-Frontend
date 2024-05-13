import HTTPRequestCommand from "./HTTPRequestCommand";
import IHTTPClient from "../requests/public/IHTTPClient";
import ApplicationState from "../../state/public/ApplicationStateType";

export class LoginCommand extends HTTPRequestCommand {
    private username: string;
    private password: string;

    public constructor(username: string, password: string, client?: IHTTPClient) {
        super(client);
        this.username = username;
        this.password = password;
    }

    async execute(state: ApplicationState) {
    }
}
import HTTPRequestCommand from "./HTTPRequestCommand";
import IHTTPClient from "../requests/public/IHTTPClient";
import ApplicationState from "../../state/public/ApplicationStateType";

export class RegisterCommand extends HTTPRequestCommand {
    private username: string;
    private password: string;
    private email: string;

    public constructor(username: string, password: string, email: string, client?: IHTTPClient) {
        super(client);
        this.username = username;
        this.password = password;
        this.email = email;
    }

    async execute(state: ApplicationState) {
    }
}
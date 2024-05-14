import ICommand from "./ICommand";
import ApplicationState from "../../state/public/ApplicationStateType";
import logout from "../../state/public/utils/logout";

export class LogoutCommand implements ICommand {
    public execute(state: ApplicationState) {
        logout(state);
    }
}
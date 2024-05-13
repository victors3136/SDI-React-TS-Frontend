import ICommand from "./ICommand";
import ApplicationState from "../../state/public/ApplicationStateType";

export class LogoutCommand implements ICommand {
    public execute(state: ApplicationState) {
        state.setJSONWebToken(undefined);
    }
}
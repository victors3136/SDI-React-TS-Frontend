import ApplicationState from "../../state/public/ApplicationStateType";

interface ICommand {
    execute(state: ApplicationState): void;
}

export default ICommand;
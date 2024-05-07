import ApplicationState from "../state/interface-application-state-store";

interface ICommand {
    execute(state: ApplicationState): void;
}

export default ICommand;
import ApplicationState from "../../state/public/ApplicationStateType";
import ICommand from "./ICommand";
import {sortTasks} from "../../state/public/utils/sortTasks";

class GetSortedTasksCommand implements ICommand {
    private readonly orderingDirection: string;

    public constructor(orderingDirection?: string) {
        this.orderingDirection = orderingDirection ?? "DES";
    }

    public execute(state: ApplicationState) {
        sortTasks(state, this.orderingDirection);
    }
}

export default GetSortedTasksCommand;
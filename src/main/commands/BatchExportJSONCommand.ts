import ICommand from "./ICommand";
import ApplicationState from "../../state/public/ApplicationStateType";
import {createAndDownloadJSON} from "../../state/public/utils/createAndDownloadJSON";

export class BatchExportJSONCommand implements ICommand {
    execute(state: ApplicationState) {
        const idSet = state.selectedTaskIDs;
        createAndDownloadJSON(state.tasks.filter(task => idSet.has(task.id)), 'export.json');
    }
}
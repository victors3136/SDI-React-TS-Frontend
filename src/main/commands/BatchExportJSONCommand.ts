import ICommand from "./ICommand";
import ApplicationState from "../../state/public/ApplicationStateType";
import {createAndDownloadJSON} from "../../state/public/utils/createAndDownloadJSON";

export class BatchExportJSONCommand implements ICommand {
    execute(state: ApplicationState) {
        const set = state.selectedTaskIDs;
        createAndDownloadJSON(state.tasks.filter(task => set.has(task.id)), 'export.json');
    }
}
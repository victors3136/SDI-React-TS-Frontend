import useAppStateStore from "../../../../state/hidden/ApplicationStateStore";
import SubtaskBase from "../../../../state/public/SubtaskBase";
import PostSubtaskCommand from "../../../commands/create/PostSubtaskCommand";
import {GenericSubtaskForm} from "./GenericSubtaskForm";
import Subtask from "../../../../state/hidden/Subtask";

export const SubtaskAddComponent = () => {
    const state = useAppStateStore();
    const taskID = state.addingChildrenForATaskID;
    if (!taskID) {
        return <></>;
    }
    const submit = (data: SubtaskBase) => new PostSubtaskCommand(data).execute(state);
    const cleanup = () => state.setParentTaskID(undefined);
    return <GenericSubtaskForm submit={submit}
                            defaultFieldValues={new Subtask({subject: "", task: taskID})}
                            cleanup={cleanup}/>;
}
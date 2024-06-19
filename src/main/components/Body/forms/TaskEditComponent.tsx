import React from "react";
import useAppStateStore from "../../../../state/hidden/ApplicationStateStore";
import {GenericTaskForm} from "./GenericTaskForm";
import PatchTaskCommand from "../../../commands/update/PatchTaskCommand";
import ITask from "../../../../state/public/ITask";

export const TaskEditComponent = () => {
    const state = useAppStateStore();
    const editedTask = state.editedTask;
    return (!editedTask
        ? <></>
        : <GenericTaskForm
            submit={(task: ITask) => new PatchTaskCommand(editedTask.id, task).execute(state)}
            defaultFieldValues={editedTask}
            cleanup={() => state.setEditedTask(undefined)}
        />);
}
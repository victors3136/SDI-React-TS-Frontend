import {GenericTaskForm} from "./GenericTaskForm";
import PostTaskCommand from "../../commands/create/PostTaskCommand";
import React from "react";
import useAppStateStore from "../../state/hidden/ApplicationStateStore";
import Task from "../../state/hidden/Task";
import ITask from "../../state/public/ITask";

export const TaskAddComponent = () => {
    const defaultTask = new Task({name: "", description: "", priority: 0, dueDate: new Date()});
    const state = useAppStateStore();
    if (!state.addingTask) {
        return <></>;
    }
    return <GenericTaskForm
        submitCallback={(task: ITask) => new PostTaskCommand(task).execute(state)}
        defaultFieldValues={defaultTask}
        cleanup={() => state.setAddingTask(false)}
    />
};
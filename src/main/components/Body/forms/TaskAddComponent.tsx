import React from "react";
import Task from "../../../../state/hidden/Task";
import useAppStateStore from "../../../../state/hidden/ApplicationStateStore";
import {GenericTaskForm} from "./GenericTaskForm";
import ITask from "../../../../state/public/ITask";
import PostTaskCommand from "../../../commands/create/PostTaskCommand";

export const TaskAddComponent = () => {
    const defaultTask = new Task({name: "", description: "", priority: 0});
    const state = useAppStateStore();
    if (!state.addingTask) {
        return <h1> not adding</h1>;
    }
    return <>
        <h1>yes adding</h1>
        <GenericTaskForm
            submit={(task: ITask) => new PostTaskCommand(task).execute(state)}
            defaultFieldValues={defaultTask}
            cleanup={() => state.setAddingTask(false)}
        /></>
};
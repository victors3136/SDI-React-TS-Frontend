import React from "react";
import Task from "../../../state/hidden/Task";
import useAppStateStore from "../../../state/hidden/ApplicationStateStore";
import {GenericTaskForm} from "./GenericTaskForm";
import ITask from "../../../state/public/ITask";
import PostTaskCommand from "../../commands/create/PostTaskCommand";

export const TaskAddComponent = () => {
    const defaultTask = new Task({name: "Enter a name", description: "Enter a description", priority: 0});
    console.log("Built " + JSON.stringify(defaultTask));
    const state = useAppStateStore();
    // return <h1>Addin</h1>;
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
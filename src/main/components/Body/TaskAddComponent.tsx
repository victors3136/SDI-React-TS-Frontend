import React from "react";
import Task from "../../../state/hidden/Task";

export const TaskAddComponent = () => {
    const defaultTask = new Task({name: "Enter a name", description: "Enter a description", priority: 0});
    // console.log("Built " + JSON.stringify(defaultTask));
    // const state = useAppStateStore();
    return <h1>Addin</h1>;
    // if (!state.addingTask) {
    //     return <></>;
    // }
    // return <GenericTaskForm
    //     submit={(task: ITask) => new PostTaskCommand(task).execute(state)}
    //     defaultFieldValues={defaultTask}
    //     cleanup={() => state.setAddingTask(false)}
    // />
};
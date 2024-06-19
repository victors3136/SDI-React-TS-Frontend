import React from "react";
import useAppStateStore from "../../../../state/hidden/ApplicationStateStore";
import {GenericTaskForm} from "./GenericTaskForm";
import ITask from "../../../../state/public/ITask";
import PostTaskCommand from "../../../commands/create/PostTaskCommand";

export const TaskAddComponent = () => {
    const state = useAppStateStore();
    return (
        !state.addingTask
            ? <></>
            : <GenericTaskForm
                submit={(task: ITask) => new PostTaskCommand(task).execute(state)}
                defaultFieldValues={{name: "", description: "", priority: 0, user: state.userID}}
                cleanup={() => state.setAddingTask(false)}
            />
    );
};
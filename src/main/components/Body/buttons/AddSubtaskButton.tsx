import ApplicationState from "../../../../state/public/ApplicationStateType";
import ITask from "../../../../state/public/ITask";
import {BiPlus} from "react-icons/bi";
import React from "react";

export const AddSubtaskButton = (props: { state: ApplicationState, task: ITask }) => {
    const {state, task} = props;
    return <button
        onClick={() => state.setParentTaskID(task.id)}
        className="Only-Icon-Button inherit-color-scheme">
        <BiPlus className="Larger-Icon"/>
    </button>
}
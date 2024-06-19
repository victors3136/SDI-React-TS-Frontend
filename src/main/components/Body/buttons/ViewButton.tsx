import ApplicationState from "../../../../state/public/ApplicationStateType";
import ITask from "../../../../state/public/ITask";
import {FaRegEye} from "react-icons/fa";
import React from "react";
import GetSubtaskCountForTask from "../../../commands/read/GetSubtaskCountForTask";
import GetSubtasksForTask from "../../../commands/read/GetSubtasksForTask";

export const ViewButton = (props: { state: ApplicationState, task: ITask }) =>
    <button onClick={() => {
        props.state.setViewedTask(props.task);
        new GetSubtaskCountForTask(props.task.id).execute(props.state);
        new GetSubtasksForTask(props.task.id).execute(props.state);
    }}
            className="Only-Icon-Button inherit-color-scheme">
        <FaRegEye className="Larger-Icon"/>
    </button>
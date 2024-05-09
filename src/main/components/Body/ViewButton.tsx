import ApplicationState from "../../../state/public/ApplicationStateType";
import ITask from "../../../state/public/ITask";
import {FaRegEye} from "react-icons/fa";
import React from "react";

export const ViewButton = (props: { state: ApplicationState, task: ITask }) =>
    <button onClick={() => props.state.setViewedTask(props.task)}
            className="Only-Icon-Button">
        <FaRegEye className="Larger-Icon"/>
    </button>
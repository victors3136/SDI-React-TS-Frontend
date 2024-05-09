import ApplicationState from "../../../state/public/ApplicationStateType";
import ITask from "../../../state/public/ITask";
import {toggleId} from "../../../state/public/utils/toggleId";
import {FaToggleOn} from "react-icons/fa";
import {FaToggleOff} from "react-icons/fa6";
import React from "react";

export const ToggleSelectionButton = (props: { state: ApplicationState, task: ITask }) => {
    const state = props.state;
    const id = props.task.id;
    return <button onClick={() => toggleId(state, id)}
                   className="Only-Icon-Button">
        {
            state.selectedTaskIDs.has(id)
                ? <FaToggleOn className="Larger-Icon"/>
                : <FaToggleOff className="Larger-Icon"/>
        }
    </button>
};
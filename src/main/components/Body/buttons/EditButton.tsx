import ApplicationState from "../../../../state/public/ApplicationStateType";
import ITask from "../../../../state/public/ITask";
import {MdOutlineSettings} from "react-icons/md";
import React from "react";

export const EditButton = (props: { state: ApplicationState, task: ITask }) => {
    return <button onClick={() => props.state.setEditedTask(props.task)}
                   className="Only-Icon-Button inherit-color-scheme">
        <MdOutlineSettings className="Larger-Icon"/>
    </button>;
}
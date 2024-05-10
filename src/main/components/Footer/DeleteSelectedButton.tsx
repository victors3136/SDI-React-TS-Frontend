import React from "react";
import {BiTaskX} from "react-icons/bi";
import ApplicationState from "../../../state/public/ApplicationStateType";
import DeleteTasksCommand from "../../commands/delete/DeleteTasksCommand";

export const DeleteSelectedButton = (props: { state: ApplicationState }) =>
    <button
        onClick={() => new DeleteTasksCommand(
            props.state.tasks.map(task => task.id).filter(id => props.state.selectedTaskIDs.has(id))
        ).execute(props.state)}
        className="inherit-color-scheme Only-Icon-Button">
        <BiTaskX className="Larger-Icon"/>
    </button>;
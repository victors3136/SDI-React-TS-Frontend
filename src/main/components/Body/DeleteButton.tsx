import ApplicationState from "../../../state/public/ApplicationStateType";
import ITask from "../../../state/public/ITask";
import DeleteTaskCommand from "../../commands/delete/DeleteTaskCommand";
import {MdDelete} from "react-icons/md";
import React from "react";

export const DeleteButton = (props: { state: ApplicationState, task: ITask }) =>
    <button onClick={() => new DeleteTaskCommand(props.task.id).execute(props.state)}
            className="Only-Icon-Button">
        <MdDelete className="Larger-Icon"/>
    </button>
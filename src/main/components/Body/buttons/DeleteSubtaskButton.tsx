import ApplicationState from "../../../../state/public/ApplicationStateType";
import DeleteSubtaskCommand from "../../../commands/delete/DeleteSubtaskCommand";
import {MdDelete} from "react-icons/md";
import React from "react";

export const DeleteSubtaskButton = (props: { state: ApplicationState, id: string }) =>
    <button onClick={() => new DeleteSubtaskCommand(props.id).execute(props.state)}
            className="Only-Icon-Button">
        <MdDelete className="Larger-Icon"/>
    </button>;
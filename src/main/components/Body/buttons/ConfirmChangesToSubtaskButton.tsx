import ApplicationState from "../../../../state/public/ApplicationStateType";
import {FaCheck} from "react-icons/fa";
import React from "react";
import PatchSubtaskCommand from "../../../commands/update/PatchSubtaskCommand";
import ISubtask from "../../../../state/public/ISubtask";

export const ConfirmChangesToSubtaskButton = (props: {
    state: ApplicationState,
    id: string,
    subtask: ISubtask,
    cleanup: () => void
}) =>
    <button onClick={() => {
        new PatchSubtaskCommand(props.id, props.subtask).execute(props.state);
        props.cleanup();
    }}
            className="Only-Icon-Button">
        <FaCheck className="Larger-Icon"/>
    </button>
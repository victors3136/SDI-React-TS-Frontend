import ApplicationState from "../../../../state/public/ApplicationStateType";
import ISubtask from "../../../../state/public/ISubtask";
import React, {useState} from "react";
import PatchSubtaskCommand from "../../../commands/update/PatchSubtaskCommand";
import Subtask from "../../../../state/hidden/Subtask";
import {DeleteSubtaskButton} from "../buttons/DeleteSubtaskButton";
import {ConfirmChangesToSubtaskButton} from "../buttons/ConfirmChangesToSubtaskButton";
import {StartToEditSubtaskButton} from "../buttons/StartToEditSubtaskButton";

export const SubtaskView = (props: { state: ApplicationState, subtask: ISubtask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const subtask = props.subtask;
    let subject = subtask.subject;
    const id = subtask.id;

    return <div
        style={{
            display: "block",
            border: "solid  2px",
            borderColor: "#111111",
            backgroundColor: "#111111",
            borderRadius: "5px",
            width: "100%",
            padding: "3%",
            margin: "1%"
        }}>
        {
            isEditing
                ? <input type="text"
                         value={subject}
                         onChange={() => new PatchSubtaskCommand(id, new Subtask({id, subject, task: subtask.task}))}/>
                : <p>{subject}</p>}
        <div style={{display: "inline-flex"}}>
            <DeleteSubtaskButton state={props.state} id={subtask.id}/>
            {
                isEditing
                    ? <ConfirmChangesToSubtaskButton state={props.state} id={subtask.id}/>
                    : <StartToEditSubtaskButton startEditing={() => setIsEditing(true)}/>
            }
        </div>
    </div>;
}
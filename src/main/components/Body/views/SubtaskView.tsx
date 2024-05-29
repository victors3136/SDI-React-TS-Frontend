import ApplicationState from "../../../../state/public/ApplicationStateType";
import ISubtask from "../../../../state/public/ISubtask";
import React, {useState} from "react";
import Subtask from "../../../../state/hidden/Subtask";
import {DeleteSubtaskButton} from "../buttons/DeleteSubtaskButton";
import {ConfirmChangesToSubtaskButton} from "../buttons/ConfirmChangesToSubtaskButton";
import {StartToEditSubtaskButton} from "../buttons/StartToEditSubtaskButton";
import "../../../../styling/public/css/App.css";
import {canDeleteSubtask, canEditSubtask} from "../../../../state/public/utils/permissionChecks";

export const SubtaskView = (props: { state: ApplicationState, subtask: ISubtask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const subtask = props.subtask;
    const [subject, setSubject] = useState(subtask.subject);
    const id = subtask.id;
    const task = subtask.task;
    return <div
        className="SubtaskView"
        style={{display: "block", width: "100%"}}>
        {
            isEditing
                ? <input type="text"
                         value={subject}
                         style={{width: "100 %"}}
                         onChange={change => setSubject(change.target.value)}/>
                : <p style={{marginTop: "1rem"}}>{subject}</p>}
        <div style={{display: "inline-flex", justifyContent: "space-around", width: "100%"}}>
            {canDeleteSubtask(props.state, props.subtask) && <DeleteSubtaskButton state={props.state} id={id}/>}
            {canEditSubtask(props.state, props.subtask) &&
                (isEditing
                    ? <ConfirmChangesToSubtaskButton state={props.state} id={id}
                                                     subtask={new Subtask({id, subject, task})}
                                                     cleanup={() => setIsEditing(false)}/>
                    : <StartToEditSubtaskButton startEditing={() => setIsEditing(true)}/>)
            }
        </div>
    </div>;
}
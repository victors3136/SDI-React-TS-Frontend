import ApplicationState from "../../../../state/public/ApplicationStateType";
import {SubtaskView} from "./SubtaskView";
import React from "react";

export const SubtaskListView = (props: { state: ApplicationState }) => {
    const state = props.state;
    const subtasks = state.subtasks;
    console.log(JSON.stringify(subtasks));
    return <div className="SubtaskListView"
                style={{display: "block"}}>
        {subtasks.map(subtask => <SubtaskView key={subtask.id} state={state} subtask={subtask}/>)}
    </div>
}
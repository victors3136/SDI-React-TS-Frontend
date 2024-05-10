import React from "react";
import useAppStateStore from "../../../../state/hidden/ApplicationStateStore";
import {FaRegWindowClose} from "react-icons/fa";
import {LoadingComponent} from "../LoadingComponent";
import ApplicationState from "../../../../state/public/ApplicationStateType";
import {SubtaskView} from "./SubtaskView";

const cleanup = (state: ApplicationState) => {
    state.setViewedTask(undefined);
    state.setSubtaskCount(-1);
    state.setSubtasks([]);
}

export const TaskViewComponent = () => {
    const state = useAppStateStore();
    if (!state.viewedTask) {
        return <></>;
    }
    const viewedTask = state.viewedTask;
    const dueDate = viewedTask.dueDate;

    return <div className="Div-Covering-The-Whole-Screen-Semitransparent">
        <div style={{overflow: "hidden"}}>
            <h1>{viewedTask.name}</h1>
            {viewedTask.description && <p>Description: {viewedTask.description}</p>}
            <p>Priority: {viewedTask.priority}</p>
            <p>Due on: {`${dueDate.getDate()}/${dueDate.getMonth()}/${dueDate.getFullYear()}`}</p>
            {
                state.subtaskCount >= 0
                    ? <p>{state.subtaskCount} Children: </p>
                    : <p>Fetching...</p>
            }
            {
                state.subtasks.length <= 0
                    ? <LoadingComponent/>
                    : <div
                        style={{
                            display: "block",
                            height: "250px",
                            overflowY: "scroll",
                            paddingRight: "3%",
                            overflowX: "clip"
                        }}>
                        {state.subtasks.map(subtask => <SubtaskView key={subtask.id} state={state} subtask={subtask}/>)}
                    </div>
            }
            <div style={{justifyContent: "flex-end"}}>
                <button onClick={() => cleanup(state)} className="Only-Icon-Button"
                        style={{color: "silver"}}><FaRegWindowClose className="Larger-Icon"/>
                </button>
            </div>
        </div>
    </div>;

};
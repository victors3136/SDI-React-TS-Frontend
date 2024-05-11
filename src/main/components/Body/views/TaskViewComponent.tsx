import React from "react";
import useAppStateStore from "../../../../state/hidden/ApplicationStateStore";
import {FaRegWindowClose} from "react-icons/fa";
import {LoadingSpinnerComponent} from "../misc/LoadingSpinnerComponent";
import ApplicationState from "../../../../state/public/ApplicationStateType";
import {SubtaskListView} from "./SubtaskListView";

const cleanup = (state: ApplicationState) => {
    state.setViewedTask(undefined);
    state.setSubtaskCount(-1);
    state.setSubtasks([]);
}

const childrenCountNotFetched = (state: ApplicationState) => state.subtaskCount === -1;
const childrenNotFetched = (state: ApplicationState) => state.subtasks.length <= 0;
const dataStillFetching = (state: ApplicationState) => childrenCountNotFetched(state) && childrenNotFetched(state);

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
                childrenCountNotFetched(state)
                    ? <p>Fetching...</p>
                    : <p>{state.subtaskCount} Children: </p>

            }
            {
                dataStillFetching(state)
                    ? <LoadingSpinnerComponent/>
                    : (
                        childrenNotFetched(state)
                            ? <p>Add a subtask to see it here!</p>
                            : <SubtaskListView state={state}/>
                    )
            }
            <div style={{justifyContent: "flex-end"}}>
                <button onClick={() => cleanup(state)} className="Only-Icon-Button"
                        style={{color: "silver"}}><FaRegWindowClose className="Larger-Icon"/>
                </button>
            </div>
        </div>
    </div>;

};
import React from "react";
import useAppStateStore from "../../../state/hidden/ApplicationStateStore";
import {FaRegWindowClose} from "react-icons/fa";

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
            {/*<p>{state.childrenCount} Children: </p>*/}
            {/*<div*/}
            {/*    style={{display: "block", height: "250px", overflowY: "scroll", paddingRight: "3%", overflowX: "clip"}}>*/}
            {/*    {state.subentityList.map(subentity => <ChildView key={subentity.id} child={subentity}/>)}*/}
            {/*</div>*/}
            <div style={{justifyContent: "flex-end"}}>
                <button onClick={() => state.setViewedTask(undefined)} className="Only-Icon-Button"
                        style={{color: "silver"}}><FaRegWindowClose className="Larger-Icon"/>
                </button>
            </div>
        </div>
    </div>;
};
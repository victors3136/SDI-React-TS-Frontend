import ITask from "../../../../state/public/ITask";
import {priorityColorProvider} from "../../../../styling/public/priorityColorProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import ApplicationState from "../../../../state/public/ApplicationStateType";
import React from "react";
import {ViewButton} from "../buttons/ViewButton";
import {DeleteButton} from "../buttons/DeleteButton";
import {EditButton} from "../buttons/EditButton";
import {ToggleSelectionButton} from "../buttons/ToggleSelectionButton";
import {AddSubtaskButton} from "../buttons/AddSubtaskButton";
import {canDeleteTask, canEditTask, hasViewPermission} from "../../../../state/public/utils/permissionChecks";

export const TaskMiniView = (props: { id: string, state: ApplicationState, task: ITask }) => {
    const state = props.state;
    const {colorSchemeProvider} = state;
    const {name, priority, dueDate} = props.task;
    return <div id={props.id} className="col inherit-color-scheme">
        <div
            className="card Entry-View inherit-color-scheme"
            style={{
                color: colorSchemeProvider.textColor(),
                backgroundColor: priorityColorProvider(priority, colorSchemeProvider),
                borderRadius: "0",
                display: "flex",
                flexDirection: "column",
                minHeight: "100%"
            }}>
            <div style={{padding: "1%"}}>
                <h1 className="card-title inherit-color-scheme"
                    style={{
                        textAlign: "center",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        textWrap: "nowrap",
                        padding: "2px"
                    }}>
                    {name}
                </h1>
                <h2 className="card-subtitle inherit-color-scheme"
                    style={{width: "100%", justifyContent: "center", display: "flex"}}>
                    Due on
                    {` ${dueDate.getDate()}/${dueDate.getMonth()}/${dueDate.getFullYear()}`}
                </h2>
            </div>
            <div className="card-footer  inherit-color-scheme" style={{marginTop: "auto"}}>
                <div className="container-fluid flex-row justify-content-evenly  inherit-color-scheme"
                     style={{padding: "8px", display: "flex", height: "100%"}}>
                    {hasViewPermission(state) && <ViewButton state={props.state} task={props.task}/>}
                    {canEditTask(state, props.task) && <EditButton state={props.state} task={props.task}/>}
                    {canDeleteTask(state, props.task) && <DeleteButton state={props.state} task={props.task}/>}
                    <ToggleSelectionButton state={props.state} task={props.task}/>
                    {canEditTask(state, props.task) && <AddSubtaskButton state={props.state} task={props.task}/>}
                </div>
            </div>
        </div>
    </div>;
};
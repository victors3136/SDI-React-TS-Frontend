import ITask from "../../../state/public/ITask";
import {priorityColorProvider} from "../../../styling/public/priorityColorProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import ApplicationState from "../../../state/public/ApplicationStateType";
import React from "react";
import {ViewButton} from "./ViewButton";
import {DeleteButton} from "./DeleteButton";
import {EditButton} from "./EditButton";
import {ToggleSelectionButton} from "./ToggleSelectionButton";

export const TaskMiniView = (props: { state: ApplicationState, task: ITask }) => {
    const state = props.state;
    const {colorSchemeProvider} = state;
    const {name, priority, dueDate} = props.task;
    return <div className="col inherit-color-scheme">
        <div key={props.task.id}
             className="card Entry-View inherit-color-scheme"
             style={{
                 color: colorSchemeProvider.textColor(),
                 backgroundColor: priorityColorProvider(priority, colorSchemeProvider),
                 border: "2px solid " + colorSchemeProvider.accentColor(),
                 boxShadow: colorSchemeProvider.accentColor(),
                 borderRadius: "5px",
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
                    <ViewButton state={props.state} task={props.task}/>
                    <EditButton state={props.state} task={props.task}/>
                    <DeleteButton state={props.state} task={props.task}/>
                    <ToggleSelectionButton state={props.state} task={props.task}/>
                    {/*<AddSubtaskButton id={target.target.id}/>*/}
                </div>
            </div>
        </div>
    </div>;
};
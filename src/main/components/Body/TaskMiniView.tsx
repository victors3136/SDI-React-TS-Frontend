import ITask from "../../../state/public/ITask";
import {priorityColorProvider} from "../../../styling/public/priorityColorProvider";
import useAppStateStore from "../../../state/hidden/ApplicationStateStore";
import 'bootstrap/dist/css/bootstrap.min.css';
import ApplicationState from "../../../state/public/ApplicationStateType";
import {FaRegEye} from "react-icons/fa";
import React from "react";
import {MdDelete} from "react-icons/md";
import DeleteTaskCommand from "../../commands/delete/DeleteTaskCommand";

const ViewButton = (props: { state: ApplicationState, task: ITask }) =>
    <button onClick={() => props.state.setViewedTask(props.task)}
            className="Only-Icon-Button">
        <FaRegEye className="Larger-Icon"/>
    </button>
const DeleteButton = (props: { state: ApplicationState, task: ITask }) =>
    <button onClick={() => new DeleteTaskCommand(props.task.id).execute(props.state)}
            className="Only-Icon-Button">
        <MdDelete className="Larger-Icon"/>
    </button>

export const TaskMiniView = (props: { state: ApplicationState, task: ITask }) => {
    const {colorSchemeProvider} = useAppStateStore.getState();
    return <div className="col inherit-color-scheme">
        <div key={props.task.id}
             className="card Entry-View inherit-color-scheme"
             style={{
                 color: colorSchemeProvider.textColor(),
                 backgroundColor: priorityColorProvider(props.task, colorSchemeProvider),
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
                    }}> {props.task.name}
                </h1>
                <h2 className="card-subtitle inherit-color-scheme"
                    style={{width: "100%", justifyContent: "center", display: "flex"}}>
                    Due on {
                    `${props.task.dueDate.getDate()} - ${props.task.dueDate.getMonth()} - ${props.task.dueDate.getFullYear()}`
                }
                </h2>
            </div>
            <div className="card-footer  inherit-color-scheme" style={{marginTop: "auto"}}>
                <div className="container-fluid flex-row justify-content-evenly  inherit-color-scheme"
                     style={{padding: "8px", display: "flex", height: "100%"}}>
                    <ViewButton state={props.state} task={props.task}/>
                    {/*<EditButton target={target.target}/>*/}
                    <DeleteButton state={props.state} task={props.task}/>
                    {/*<ToggleSelectionButton target={target.target}/>*/}
                    {/*<AddSubtaskButton id={target.target.id}/>*/}
                </div>
            </div>
        </div>
    </div>;
};
import ApplicationState from "../../../state/public/ApplicationStateType";
import {AddButton} from "./AddButton";
import {SortByPriorityASCButton} from "./SortByPriorityASCButton";
import {SortByPriorityDESButton} from "./SortByPriorityDESButton";
import {DeleteSelectedButton} from "./DeleteSelectedButton";
import {ExportSelectedButton} from "./ExportSelectedButton";
import {ChangeStyleButton} from "./ChangeStyleButton";
import React from "react";
import LogoutButton from "./LogoutButton";
import {
    hasAddPermission,
    hasAssignPermission,
    hasDeleteBatchPermission
} from "../../../state/public/utils/permissionChecks";
import {ViewUsersButton} from "./ViewUsersButton";

export const AfterLoginFooter = (props: { state: ApplicationState }) =>
    <div
        className="container-fluid flex-row justify-content-evenly Button-Bar"
        style={{padding: "8px", display: "flex", height: "100%", overflow: "scroll"}}>
        {
            hasAddPermission(props.state) && <div><AddButton/>Add</div>
        }
        <div><SortByPriorityASCButton state={props.state}/>Sort</div>
        <div><SortByPriorityDESButton state={props.state}/>Reverse Sort</div>
        {
            hasDeleteBatchPermission(props.state) &&
            <div><DeleteSelectedButton state={props.state}/>Delete Selection</div>
        }
        <div><ExportSelectedButton state={props.state}/>Export Selection</div>
        {
            hasAssignPermission(props.state)
            && <div><ViewUsersButton state={props.state}/>View Users</div>
        }
        <div><ChangeStyleButton/>Change Style</div>
        <div><LogoutButton/>Logout</div>
    </div>;
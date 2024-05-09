import GetSortedTasksCommand from "../../commands/read/GetSortedTasksCommand";
import React from "react";
import {BiSortDown} from "react-icons/bi";
import ApplicationState from "../../../state/public/ApplicationStateType";

export const SortByPriorityDESButton = (props: { state: ApplicationState }) => {
    return <button onClick={() => new GetSortedTasksCommand("DES").execute(props.state)}
                   className="inherit-color-scheme Only-Icon-Button Footer-Button">
        <BiSortDown className="Larger-Icon"/></button>;
}
import GetSortedTasksCommand from "../../commands/GetSortedTasksCommand";
import React from "react";
import {BiSortUp} from "react-icons/bi";
import ApplicationState from "../../../state/public/ApplicationStateType";

export const SortByPriorityASCButton = (props: { state: ApplicationState }) => {
    return <button onClick={() => new GetSortedTasksCommand("ASC").execute(props.state)}
                   className="inherit-color-scheme Only-Icon-Button Footer-Button">
        <BiSortUp className="Larger-Icon"/>
    </button>;
}
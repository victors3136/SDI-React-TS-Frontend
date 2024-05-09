import useAppStateStore from "../../state/hidden/ApplicationStateStore";
import GetSortedTasksCommand from "../../commands/read/GetSortedTasksCommand";
import React from "react";
import {BiSortUp} from "react-icons/bi";

export const SortByPriorityASCButton = () => {
    const state = useAppStateStore();
    return <button onClick={() => new GetSortedTasksCommand("ASC").execute(state)}
                   className="inherit-color-scheme Only-Icon-Button Footer-Button">
        <BiSortUp className="Larger-Icon"/>
    </button>;
}
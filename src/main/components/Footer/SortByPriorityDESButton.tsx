import useAppStateStore from "../../state/hidden/ApplicationStateStore";
import GetSortedTasksCommand from "../../commands/read/GetSortedTasksCommand";
import React from "react";
import {BiSortDown} from "react-icons/bi";

export const SortByPriorityDESButton = () => {
    const state = useAppStateStore();
    return <button onClick={() => new GetSortedTasksCommand("DES").execute(state)}
                   className="inherit-color-scheme Only-Icon-Button Footer-Button">
        <BiSortDown className="Larger-Icon"/></button>;
}
import React from "react";
import {BiPlus} from 'react-icons/bi';
import useAppStateStore from "../../../state/hidden/ApplicationStateStore";

const {setAddingTask} = useAppStateStore.getState();

export const AddButton = () => {
    return <button onClick={() => setAddingTask(true)}
                   className="Footer-Button Only-Icon-Button inherit-color-scheme">
        <BiPlus className="Larger-Icon"/>
    </button>;
};
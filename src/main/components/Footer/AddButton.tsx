import React from "react";
import useAppStateStore from "../../state/application-state-store";
import {BiPlus} from 'react-icons/bi';

export const AddButton = () => {
    const state = useAppStateStore();
    return (
        <button onClick={() => state.setAddingTask(true)}
                className="inherit-color-scheme Only-Icon-Button Footer-Button">
            <BiPlus className="Larger-Icon"/>
        </button>
    );
};
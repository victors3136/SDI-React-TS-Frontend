import React from "react";
import {BiPlus} from 'react-icons/bi';
import useAppStateStore from "../../state/hidden/ApplicationStateStore";

export const AddButton = () => {
    const state = useAppStateStore();
    return <button onClick={() => {
            state.setAddingTask(true)
        }}
                className="Footer-Button Only-Icon-Button inherit-color-scheme">
            <BiPlus className="Larger-Icon"/>
        </button>;
};
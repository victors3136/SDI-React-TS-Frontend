import React from "react";
import {MdOutlineAssignmentInd} from "react-icons/md";
import useAppStateStore from "../../../state/hidden/ApplicationStateStore";

export const RegisterButton = () => {
    const state = useAppStateStore();
    return <button onClick={() => state.setRegistering(true)} className="Only-Icon-Button inherit-color-scheme">
        <MdOutlineAssignmentInd className="Larger-Icon"/>
    </button>;
};
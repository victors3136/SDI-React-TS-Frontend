import ApplicationState from "../../../../state/public/ApplicationStateType";
import {FaCheck} from "react-icons/fa";
import React from "react";

export const ConfirmChangesToSubtaskButton = (props: { state: ApplicationState, id: string }) =>
    <button onClick={() => console.warn("Not implemented!!")}
            className="Only-Icon-Button">
        <FaCheck className="Larger-Icon"/></button>
import React from "react";
import {BiTaskX} from "react-icons/bi";
import ApplicationState from "../../../state/public/ApplicationStateType";

export const RemoveSelectedButton = (props: { state: ApplicationState }) =>
    <button onClick={() => console.log("RemoveSelected pressed")}
            className="inherit-color-scheme Only-Icon-Button">
        <BiTaskX className="Larger-Icon"/>
    </button>;
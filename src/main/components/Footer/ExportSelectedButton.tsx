import React from "react";
import {BiShareAlt} from "react-icons/bi";
import ApplicationState from "../../../state/public/ApplicationStateType";

export const ExportSelectedButton = (props: { state: ApplicationState }) =>
    <button onClick={() => console.log("ExportSelected pressed")}
            className="inherit-color-scheme Only-Icon-Button Footer-Button">
        <BiShareAlt className="Larger-Icon"/>
    </button>;
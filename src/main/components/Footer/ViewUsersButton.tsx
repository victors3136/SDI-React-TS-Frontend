import React from "react";
import {RiFileUserLine} from "react-icons/ri";
import GetUsersCommand from "../../commands/read/GetUsersCommand";
import ApplicationState from "../../../state/public/ApplicationStateType";

export const ViewUsersButton = (props: { state: ApplicationState }) => {
    return <button onClick={() => {
        new GetUsersCommand().execute(props.state);
    }}
                   className="inherit-color-scheme Only-Icon-Button">
        <RiFileUserLine className="Larger-Icon"/>
    </button>
};
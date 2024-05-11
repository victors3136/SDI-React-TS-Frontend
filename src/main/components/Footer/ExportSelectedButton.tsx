import React from "react";
import {BiShareAlt} from "react-icons/bi";
import ApplicationState from "../../../state/public/ApplicationStateType";
import {BatchExportJSONCommand} from "../../commands/BatchExportJSONCommand";

export const ExportSelectedButton = (props: { state: ApplicationState }) =>
    <button onClick={() => new BatchExportJSONCommand().execute(props.state)}
            className="inherit-color-scheme Only-Icon-Button Footer-Button">
        <BiShareAlt className="Larger-Icon"/>
    </button>;
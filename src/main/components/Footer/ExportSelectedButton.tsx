import React from "react";
import {BiShareAlt} from "react-icons/bi";

export const ExportSelectedButton = () =>
    <button onClick={() => console.log("ExportSelected pressed")}
            className="inherit-color-scheme Only-Icon-Button Footer-Button">
        <BiShareAlt className="Larger-Icon"/>
    </button>;
import React from "react";
import {BiTaskX} from "react-icons/bi";

export const RemoveSelectedButton = () =>
    <button onClick={() => console.log("RemoveSelected pressed")}
            className="inherit-color-scheme Only-Icon-Button">
        <BiTaskX className="Larger-Icon"/>
    </button>;
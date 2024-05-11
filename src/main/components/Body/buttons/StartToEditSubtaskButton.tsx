import {BiSolidPencil} from "react-icons/bi";
import React from "react";

export const StartToEditSubtaskButton = (props: { startEditing: () => void }) =>
    <button onClick={props.startEditing} className="Only-Icon-Button">
        <BiSolidPencil className="Larger-Icon"/>
    </button>
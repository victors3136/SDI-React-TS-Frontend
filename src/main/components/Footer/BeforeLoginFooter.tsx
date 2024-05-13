import {LoginButton} from "./LoginButton";
import {RegisterButton} from "./RegisterButton";
import {ChangeStyleButton} from "./ChangeStyleButton";
import React from "react";

export const BeforeLoginFooter = () =>
    <div
        className="container-fluid flex-row justify-content-evenly Button-Bar"
        style={{padding: "8px", display: "flex", height: "100%", overflow: "scroll"}}>
        <div><LoginButton/>Log In</div>
        <div><RegisterButton/>Register</div>
        <div><ChangeStyleButton/> Change Style</div>
    </div>;
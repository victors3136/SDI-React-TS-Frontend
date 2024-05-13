import image from "../../../styling/public/logo.png";
import React from "react";

export const WelcomeMessage = () =>
    <div style={{
        position: "relative",
        top: "16.5vh",
        maxWidth: "75vw",
        display: "relative",
        justifyContent: "space-around"
    }}>
        <h1>Welcome! Login or register to continue</h1>
        <img id="wizard" src={image} alt="logo" style={{width: "20vh", height: "20vh"}}/>
    </div>;
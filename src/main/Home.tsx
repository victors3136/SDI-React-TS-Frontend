import useAppStateStore from "../state/hidden/ApplicationStateStore";
import LoginForm from "./components/UserManagement/LoginForm";
import React from "react";
import RegisterForm from "./components/UserManagement/RegisterForm";
import {LoginButton} from "./components/UserManagement/LoginButton";
import {RegisterButton} from "./components/UserManagement/RegisterButton";
import {ChangeStyleButton} from "./components/Footer/ChangeStyleButton";
import image from "../styling/public/logo.png";

const Home = () => {
    const state = useAppStateStore();
    return <>{
        (state.logging && <LoginForm/>)
        || (state.registering && <RegisterForm/>)
        || (
            <>
                <div style={{
                    position: "absolute",
                    right: ".5rem",
                    top: ".5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "flex-start"
                }}>
                    <div><LoginButton/>Log In</div>
                    <div><RegisterButton/>Register</div>
                    <div><ChangeStyleButton/> Change Style</div>
                </div>
                <div style={{
                    position: "relative",
                    left: "12.5vw",
                    top: "33vh",
                    maxWidth: "75vw",
                    display: "relative",
                    justifyContent: "space-around"
                }}>
                    <h1>Welcome! Login or register to continue</h1>
                    <img src={image} alt="logo" style={{width: "20vh", height: "20vh"}}/>
                </div>
            </>)

    }
    </>;
}
export default Home;
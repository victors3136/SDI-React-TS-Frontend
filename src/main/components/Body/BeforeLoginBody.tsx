import useAppStateStore from "../../../state/hidden/ApplicationStateStore";
import LoginForm from "./forms/LoginForm";
import React from "react";
import RegisterForm from "./forms/RegisterForm";
import {WelcomeMessage} from "./WelcomeMessage";

const BeforeLoginBody = () => {
    const state = useAppStateStore();
    return <>
        {
            (state.logging && <LoginForm/>)
            || (state.registering && <RegisterForm/>)
            || <WelcomeMessage/>
        }
    </>;
}
export default BeforeLoginBody;
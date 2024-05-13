import React from "react";
import useAppStateStore from "../../../state/hidden/ApplicationStateStore";
import {BiLogIn} from "react-icons/bi";

export const LoginButton = () => {
    const state = useAppStateStore();
    return <button onClick={() => state.setLogging(true)} className="Only-Icon-Button inherit-color-scheme">
        <BiLogIn className="Larger-Icon"></BiLogIn>
    </button>;
}
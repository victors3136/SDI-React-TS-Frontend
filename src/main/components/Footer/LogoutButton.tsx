import React from "react";
import {HiOutlineLogout} from "react-icons/hi";
import useAppStateStore from "../../../state/hidden/ApplicationStateStore";
import {LogoutCommand} from "../../commands/LogoutCommand";

const LogoutButton = () => {
    const state = useAppStateStore();
    return <button
        onClick={() => new LogoutCommand().execute(state)}
        className="inherit-color-scheme Only-Icon-Button">
        <HiOutlineLogout className="Larger-Icon"/>
    </button>;
}
export default LogoutButton;
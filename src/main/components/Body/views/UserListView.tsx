import React from "react";
import useAppStateStore from "../../../../state/hidden/ApplicationStateStore";
import {FaRegWindowClose} from "react-icons/fa";
import {UserViewComponent} from "./UserViewComponent";

export const UserListView = () => {
    const state = useAppStateStore();
    const cleanup = () => state.setUsers([]);
    return <div className="Div-Covering-The-Whole-Screen-Semitransparent">
        <div style={{fontSize: "2rem", width: "100vw"}}>
            <h1 style={{
                color: state.colorSchemeProvider.textColor(),
                wordBreak: "break-word",
                textJustify: "inter-word",
                overflowX: "scroll",
                height: "60vh",
                width: "100%"
            }}>
                {state.users.map(user => <UserViewComponent subject={user}/>)}
            </h1>
            <div style={{justifyContent: "flex-end"}}>
                <button onClick={cleanup} className="Only-Icon-Button"
                        style={{color: "silver"}}><FaRegWindowClose className="Larger-Icon"/>
                </button>
            </div>
        </div>
    </div>
}
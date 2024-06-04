import {SimpleUser} from "../../../../state/public/SimpleUser";
import React, {useState} from "react";
import useAppStateStore from "../../../../state/hidden/ApplicationStateStore";
import {hasAssignPermission, hasKickPermission} from "../../../../state/public/utils/permissionChecks";
import KickUserCommand from "../../../commands/delete/KickUserCommand";
import {UserRoleForm} from "./UserRoleForm";

export const UserViewComponent = (props: { subject: SimpleUser }) => {
    const state = useAppStateStore();
    const [editing, setEditing] = useState(false);
    const user = props.subject;
    const closeForm = () => setEditing(false);

    return editing
        ? (<UserRoleForm subject={props.subject} onClose={closeForm}/>)
        : (<div style={{justifyContent: "space-between", width: "100%", flexDirection: "column", marginTop: "1.5rem"}}>
            <p> {user.username}</p>
            {hasAssignPermission(state) && <button style={{
                backgroundColor: state.colorSchemeProvider.accentColor(),
                color: state.colorSchemeProvider.textColor()
            }} onClick={() => setEditing(true)}>Change Role</button>}
            {hasKickPermission(state) &&
                <button style={{
                    backgroundColor: state.colorSchemeProvider.accentColor(),
                    color: state.colorSchemeProvider.textColor()
                }} onClick={() => new KickUserCommand(props.subject.id).execute(state)}>Kick</button>}
        </div>);
}
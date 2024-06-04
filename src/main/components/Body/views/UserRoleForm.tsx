import {SimpleUser} from "../../../../state/public/SimpleUser";
import useAppStateStore from "../../../../state/hidden/ApplicationStateStore";
import React, {useState} from "react";
import AssignRoleCommand from "../../../commands/update/AssignRoleCommand";

export const UserRoleForm = (props: { subject: SimpleUser, onClose: () => void }) => {
    const state = useAppStateStore();
    const [role, setRole] = useState(props.subject.role);
    return <div style={{flexDirection: "column"}}>
        <h1> {props.subject.username}</h1>
        <input
            type="text"
            value={role}
            onChange={(change) => setRole(change.target.value)}
        />
        <button style={{
            backgroundColor: state.colorSchemeProvider.accentColor(),
            color: state.colorSchemeProvider.textColor()
        }}
                onClick={() => {
                    new AssignRoleCommand(props.subject.id, role).execute(state);
                    props.onClose();
                }}>Submit
        </button>
        <button style={{
            backgroundColor: state.colorSchemeProvider.accentColor(),
            color: state.colorSchemeProvider.textColor()
        }}
                onClick={props.onClose}>Close
        </button>
    </div>;
}
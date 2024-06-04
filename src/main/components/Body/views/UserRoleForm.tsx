import {SimpleUser} from "../../../../state/public/SimpleUser";
import useAppStateStore from "../../../../state/hidden/ApplicationStateStore";
import React, {useState} from "react";
import AssignRoleCommand from "../../../commands/update/AssignRoleCommand";

export const UserRoleForm = (props: { subject: SimpleUser, onClose: () => void }) => {
    const state = useAppStateStore();
    const [role, setRole] = useState(props.subject.role);
    return <div>
        <input
            type="text"
            value={role}
            onChange={(change) => setRole(change.target.value)}
        />
        <button onClick={() => {
            new AssignRoleCommand(props.subject.id, role).execute(state);
            props.onClose();
        }}>Submit
        </button>
        <button onClick={props.onClose}>Close</button>
    </div>;
}
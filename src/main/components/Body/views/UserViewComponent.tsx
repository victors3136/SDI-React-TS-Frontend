import {SimpleUser} from "../../../../state/public/SimpleUser";
import Combobox from "react-widgets/Combobox";
import React from "react";

export const UserViewComponent = (props: { subject: SimpleUser }) => {
    const user = props.subject;
    return <div style={{justifyContent: "space-between", width: "100%", flexDirection: "column"}}>
        <p> {user.username}</p>
        <Combobox
            style={{width: "100px", background: "darkblue", color:"silver"}}
            defaultValue={user.role}
            data={['admin', 'user', 'manager']}
            onChange={value => console.log(`Role changed to: ${value}`)}
        />
    </div>
}
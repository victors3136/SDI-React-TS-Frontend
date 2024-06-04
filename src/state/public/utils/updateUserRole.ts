import ApplicationState from "../ApplicationStateType";
import {SimpleUser} from "../SimpleUser";

const updateUserRole = (state: ApplicationState, userId: string, newRole: string) => {
    const filteredUsers = state.users.map((user: SimpleUser) =>
        user.id !== userId
            ? user
            : {...user, role: newRole}
    );
    state.setUsers(filteredUsers);
}
export default updateUserRole;
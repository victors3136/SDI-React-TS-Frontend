import ApplicationState from "../ApplicationStateType";

const removeUser = (state: ApplicationState, userId: string) => {
    const filteredUsers = state.users.filter(user => user.id !== userId);
    state.setUsers(filteredUsers);
}
export default removeUser;
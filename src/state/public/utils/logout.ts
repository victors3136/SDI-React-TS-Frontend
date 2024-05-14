import ApplicationState from "../ApplicationStateType";

const logout = (state: ApplicationState) => {
    state.setJSONWebToken(undefined);
    localStorage.removeItem('jwt');
    state.setErrorMessage("");
    state.setTasks([]);
    state.setSubtaskCount(-1);
    state.setSubtasks([]);
}
export default logout;
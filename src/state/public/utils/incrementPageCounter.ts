import ApplicationState from "../ApplicationStateType";

export const incrementPageCounter = (state: ApplicationState) => {
    const nextPage = state.latestPage + 1;
    state.setLatestPage(nextPage);
}
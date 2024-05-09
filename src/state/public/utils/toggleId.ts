import ApplicationState from "../ApplicationStateType";

export const toggleId = (state: ApplicationState, id: string) => {
    const updatedSet = new Set(state.selectedTaskIDs);

    state.selectedTaskIDs.has(id)
        ? updatedSet.delete(id)
        : updatedSet.add(id);

    state.setSelectedTaskIDs(updatedSet);
}
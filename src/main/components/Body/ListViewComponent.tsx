import useAppStateStore from "../../state/application-state-store";
import {TaskView} from "./TaskView";

export const ListViewComponent = () => {
    const state = useAppStateStore();
    return <>
        {
            state.tasks.map(task => TaskView(task))
        }
    </>
}
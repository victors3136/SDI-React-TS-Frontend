import React from "react";
import {LoadingComponent} from "./Body/LoadingComponent";
import {ListViewComponent} from "./Body/ListViewComponent";
import useAppStateStore from "../state/hidden/ApplicationStateStore";
import {TaskAddComponent} from "./Body/TaskAddComponent";
import {TaskEditComponent} from "./Body/TaskEditComponent";

const ErrorViewComponent = () => <></>
const TaskViewComponent = () => <></>;
const SubtaskViewComponent = () => <></>;
const SubtaskAddComponent = () => <></>;
const SubtaskEditComponent = () => <></>;

const BodyComponent = () => {
    const state = useAppStateStore();
    return <div className="Body inherit-color-scheme">
        {
                (state.errorMessage     && <ErrorViewComponent/>)
            ||  (state.addingTask       && <TaskAddComponent/>)
            ||  (state.viewedTask       && <TaskViewComponent/>)
            ||  (state.editedTask       && <TaskEditComponent/>)
            ||  (state.addingSubtask    && <SubtaskAddComponent/>)
            ||  (state.viewedSubtask    && <SubtaskViewComponent/>)
            ||  (state.editedSubtask    && <SubtaskEditComponent/>)
            ||  (state.tasks.length     && <ListViewComponent/>)
            || (<LoadingComponent/>)
        }
    </div>;
};
export default BodyComponent;
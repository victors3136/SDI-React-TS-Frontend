import React from "react";
import {LoadingComponent} from "./Body/LoadingComponent";
import {ListViewComponent} from "./Body/ListViewComponent";
import {TaskAddComponent} from "./Body/TaskAddComponent";
import {TaskEditComponent} from "./Body/TaskEditComponent";
import ApplicationState from "../../state/public/ApplicationStateType";
import {TaskViewComponent} from "./Body/TaskViewComponent";
import {ErrorViewComponent} from "./Body/ErrorViewComponent";

const SubtaskViewComponent = () => <></>;
const SubtaskAddComponent = () => <></>;
const SubtaskEditComponent = () => <></>;

const BodyComponent = (props: { state: ApplicationState }) => {
    const state = props.state;
    return <div className="Body inherit-color-scheme">
        {
            (state.errorMessage && <ErrorViewComponent/>)
            || (state.addingTask && <TaskAddComponent/>)
            || (state.viewedTask && <TaskViewComponent/>)
            || (state.editedTask && <TaskEditComponent/>)
            || (state.addingSubtask && <SubtaskAddComponent/>)
            || (state.viewedSubtask && <SubtaskViewComponent/>)
            || (state.editedSubtask && <SubtaskEditComponent/>)
            || (state.tasks.length && <ListViewComponent/>)
            || (<LoadingComponent/>)
        }
    </div>;
};
export default BodyComponent;
import React from "react";
import {LoadingSpinnerComponent} from "./Body/misc/LoadingSpinnerComponent";
import {ListViewComponent} from "./Body/views/ListViewComponent";
import {TaskAddComponent} from "./Body/forms/TaskAddComponent";
import {TaskEditComponent} from "./Body/forms/TaskEditComponent";
import ApplicationState from "../../state/public/ApplicationStateType";
import {TaskViewComponent} from "./Body/views/TaskViewComponent";
import {ErrorViewComponent} from "./Body/views/ErrorViewComponent";
import {SubtaskAddComponent} from "./Body/forms/SubtaskAddComponent";

const BodyComponent = (props: { state: ApplicationState }) => {
    const state = props.state;
    return <div className="Body inherit-color-scheme">
        {
            (state.errorMessage && <ErrorViewComponent/>)
            || (state.addingTask && <TaskAddComponent/>)
            || (state.viewedTask && <TaskViewComponent/>)
            || (state.editedTask && <TaskEditComponent/>)
            || (state.addingChildrenForATaskID && <SubtaskAddComponent/>)
            || (state.tasks.length && <ListViewComponent/>)
            || (<LoadingSpinnerComponent/>)
        }
    </div>;
};
export default BodyComponent;
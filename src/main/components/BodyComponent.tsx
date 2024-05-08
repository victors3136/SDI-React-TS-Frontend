import React from "react";
import LoadingComponent from "./Body/LoadingComponent";
import {ListViewComponent} from "./Body/ListViewComponent";
import useAppStateStore from "../state/application-state-store";

const ErrorViewComponent = () => <></>
const TaskViewComponent = () => <></>;
const TaskAddComponent = () => <></>;
const TaskEditComponent = () => <></>;
const SubtaskViewComponent = () => <></>;
const SubtaskAddComponent = () => <></>;
const SubtaskEditComponent = () => <></>;
const BodyComponent = () => {
    // console.log(JSON.stringify(props.state));
    // console.log("ErrorMessage " + props.state.errorMessage);
    // console.log("AddingTask " + props.state.addingTask);
    // console.log("ViewedTask " + props.state.viewedTask);
    // console.log("EditedTask " + props.state.editedTask);
    // console.log("AddingSubtask " + props.state.addingSubtask);
    // console.log("ViewingSubtask " + props.state.viewedSubtask);
    // console.log("EditingSubtask " + props.state.editedSubtask);
    // console.log("Tasks " + JSON.stringify(props.state.tasks));
    const state = useAppStateStore();
    return <div className="inherit-color-scheme Body">
        {
            (state.errorMessage && ErrorViewComponent())
            || (state.addingTask && TaskAddComponent())
            || (state.viewedTask && TaskViewComponent())
            || (state.editedTask && TaskEditComponent())
            || (state.addingSubtask && SubtaskAddComponent())
            || (state.viewedSubtask && SubtaskViewComponent())
            || (state.editedSubtask && SubtaskEditComponent())
            || (state.tasks.length && ListViewComponent())
            || (LoadingComponent())
        }
    </div>;
};
export default BodyComponent;
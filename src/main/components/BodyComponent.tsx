import React from "react";
import ApplicationState from "../../state/public/ApplicationStateType";
import {ErrorViewComponent} from "./Body/views/ErrorViewComponent";
import BeforeLoginBody from "./Body/BeforeLoginBody";
import AfterLoginBody from "./Body/AfterLoginBody";

const BodyComponent = (props: { state: ApplicationState }) => {
    const state = props.state;

    return <div className="Body inherit-color-scheme">
        {
            (state.errorMessage && <ErrorViewComponent/>)
            || ((!state.loginComplete)
                ? <BeforeLoginBody/>
                : <AfterLoginBody state={props.state}/>)
        }
    </div>;
};
export default BodyComponent;
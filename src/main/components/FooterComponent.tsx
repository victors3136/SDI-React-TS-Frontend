import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ApplicationState from "../../state/public/ApplicationStateType";
import {BeforeLoginFooter} from "./Footer/BeforeLoginFooter";
import {AfterLoginFooter} from "./Footer/AfterLoginFooter";

const FooterComponent = (props: { state: ApplicationState }) => {
    return <nav className="Footer inherit-color-scheme fixed-bottom">
        <div
            style={{
                height: "4rem",
                width: "100%",
                borderTop: "4px solid",
                boxShadow: "-5px -5px 10px"
            }}>

            {
                (!props.state.jsonWebToken)
                    ? <BeforeLoginFooter/>
                    : <AfterLoginFooter state={props.state}/>
            }

        </div>
    </nav>;
}
export default FooterComponent;
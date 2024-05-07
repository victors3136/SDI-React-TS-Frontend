import {JSXElementConstructor} from "react";
import useAppStateStore from "./state/application-state-store";

const Header: JSXElementConstructor<any> = () => {
    const state = useAppStateStore();
    return <div
        className="inherit-color-scheme Header"
        style={{
            boxShadow: state.styleFactory.accentColor(),
            borderColor: state.styleFactory.accentColor()
        }}>
        <div
            className="inherit-color-scheme TitleBox"
            style={{
                backgroundColor: state.styleFactory.headerBgColor(),
                boxShadow: "2px 2px 10px " + state.styleFactory.accentColor(),
                border: "4px solid " + state.styleFactory.accentColor()
            }}>
            <h1>Schedule Manager App</h1>
        </div>
    </div>;
}
export default Header;
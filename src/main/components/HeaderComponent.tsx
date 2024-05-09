import React from "react";
import useAppStateStore from "../state/hidden/ApplicationStateStore";

const HeaderComponent = () => {
    const provider = useAppStateStore().colorSchemeProvider;
    return <div
        className="inherit-color-scheme Header"
        style={{
            boxShadow: provider.accentColor(),
            borderColor: provider.accentColor()
        }}>
        <div
            className="inherit-color-scheme TitleBox"
            style={{
                backgroundColor: provider.headerBgColor(),
                boxShadow: "2px 2px 10px " + provider.accentColor(),
                border: "4px solid " + provider.accentColor()
            }}>
            <h1>Schedule Manager App</h1>
        </div>
    </div>
};
export default HeaderComponent;
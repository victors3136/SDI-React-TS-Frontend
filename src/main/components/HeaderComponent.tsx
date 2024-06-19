import React from "react";
import useAppStateStore from "../../state/hidden/ApplicationStateStore";

const HeaderComponent = () => {
    const provider = useAppStateStore().colorSchemeProvider;
    return <div
        className="inherit-color-scheme Header">
        <div
            className="inherit-color-scheme TitleBox"
            style={{
                backgroundColor: provider.headerBgColor()
            }}>
            <h1>Schedule Manager App</h1>
        </div>
    </div>
};
export default HeaderComponent;
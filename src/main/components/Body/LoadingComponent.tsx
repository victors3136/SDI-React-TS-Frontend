import React from "react";
import "../../../styling/public/css/Spinner.css";
import useAppStateStore from "../../state/hidden/ApplicationStateStore";

export const LoadingComponent = () => {
    const state = useAppStateStore();
    const colorSchemeProvider = state.colorSchemeProvider;
    return <div className="spinner-container">
        <div className="spinner"
             style={{
                 borderColor: colorSchemeProvider.textColor(),
                 borderLeftColor: colorSchemeProvider.accentColor()
             }}/>
    </div>
}
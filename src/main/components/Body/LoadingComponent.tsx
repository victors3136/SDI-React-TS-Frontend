import React from "react";
import "../../../styling/Spinner.css";
import useAppStateStore from "../../state/application-state-store";

const LoadingComponent = () => {
    const provider = useAppStateStore().colorSchemeProvider;
    return <div className="spinner-container">
        <div className="spinner"
             style={{
                 borderColor: provider.textColor(),
                 borderLeftColor: provider.accentColor()
             }}/>
    </div>
}
export default LoadingComponent;
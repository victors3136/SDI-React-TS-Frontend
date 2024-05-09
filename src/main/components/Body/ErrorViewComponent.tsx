import React from "react";
import {FaRegWindowClose} from "react-icons/fa";
import useAppStateStore from "../../../state/hidden/ApplicationStateStore";

export const ErrorViewComponent = () => {
    const state = useAppStateStore();
    const cleanup = () => state.setErrorMessage("");
    return <div className="Div-Covering-The-Whole-Screen-Semitransparent">
        <div>
            <h1 style={{
                color: state.colorSchemeProvider.errorColor(),
                wordBreak: "break-word",
                textJustify: "inter-word"
            }}>
                {state.errorMessage}
            </h1>
            <div style={{width: "100%", justifyContent: "flex-end"}}>
                <button onClick={cleanup} className="Only-Icon-Button">
                    <FaRegWindowClose className="Larger-Icon"
                                      style={{color: "silver"}}/>
                </button>
            </div>
        </div>
    </div>;
}
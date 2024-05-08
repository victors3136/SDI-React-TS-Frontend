import React from "react";
import styleCyclist from "../../../styling/styleCyclist";
import useAppStateStore from "../../state/application-state-store";
import {LuPaintbrush2} from "react-icons/lu";

export const ChangeStyleButton = () => {
    const state = useAppStateStore();
    return <button onClick={() => state.setColorSchemeProvider(styleCyclist())}
                   className="inherit-color-scheme Only-Icon-Button">
        <LuPaintbrush2 className="Larger-Icon">ChangeStyle</LuPaintbrush2>
    </button>;
}
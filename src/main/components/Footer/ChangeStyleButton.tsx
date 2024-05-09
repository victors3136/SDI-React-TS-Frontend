import React from "react";
import styleCyclist from "../../../styling/public/styleCyclist";
import useAppStateStore from "../../../state/hidden/ApplicationStateStore";
import {LuPaintbrush2} from "react-icons/lu";

const {setColorSchemeProvider} = useAppStateStore.getState();

export const ChangeStyleButton = () => {
    return <button onClick={() => setColorSchemeProvider(styleCyclist())}
                   className="inherit-color-scheme Only-Icon-Button">
        <LuPaintbrush2 className="Larger-Icon">ChangeStyle</LuPaintbrush2>
    </button>;
}
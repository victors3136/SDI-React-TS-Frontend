import React from "react";
import {ChangeStyleButton} from "./Footer/ChangeStyleButton";
import {AddButton} from "./Footer/AddButton";
import {SortByPriorityASCButton} from "./Footer/SortByPriorityASCButton";
import {SortByPriorityDESButton} from "./Footer/SortByPriorityDESButton";
import {RemoveSelectedButton} from "./Footer/RemoveSelectedButton";
import {ExportSelectedButton} from "./Footer/ExportSelectedButton";

const FooterComponent = () => {
    return <nav className="inherit-color-scheme Footer">
        <div
            style={{
                height: "4rem",
                width: "100%",
                borderTop: "4px solid",
                boxShadow: "-5px -5px 10px"
            }}>
            <div className="container-fluid flex-row justify-content-evenly Button-Bar"
                 style={{padding: "8px", display: "flex", height: "100%", overflow: "scroll"}}>
                <AddButton/>
                <SortByPriorityASCButton/>
                <SortByPriorityDESButton/>
                <RemoveSelectedButton/>
                <ExportSelectedButton/>
                <ChangeStyleButton/>
            </div>

        </div>
    </nav>;
}
export default FooterComponent;
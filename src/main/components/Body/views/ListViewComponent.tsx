import useAppStateStore from "../../../../state/hidden/ApplicationStateStore";
import {TaskMiniView} from "./TaskMiniView";
import 'bootstrap/dist/css/bootstrap.min.css';
import ITask from "../../../../state/public/ITask";
import React, {useEffect, useRef} from "react";
import {RegisterObserverCommand} from "../../../commands/RegisterObserverCommand";

export const ListViewComponent = () => {
    const state = useAppStateStore();
    const tasks: ITask[] = Array.from(new Map(state.tasks.map(task => [task.id, task])).values());
    const underTheLastLoadedItem = useRef(null);
    useEffect(() => new RegisterObserverCommand(underTheLastLoadedItem).execute(state),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [underTheLastLoadedItem]);
    return <div>
        <div className="row row-cols-1 row-cols-md-3 g-4" style={{padding: "1rem", width: "97.5vw"}}>
            {
                tasks.map(
                    (task: ITask) => <TaskMiniView id={task.id} state={state} task={task}/>
                )
            }
        </div>
        <div id="observer" ref={underTheLastLoadedItem}/>
    </div>
}
import useAppStateStore from "../../../state/hidden/ApplicationStateStore";
import {TaskMiniView} from "./TaskMiniView";
import 'bootstrap/dist/css/bootstrap.min.css';
import ITask from "../../../state/public/ITask";

export const ListViewComponent = () => {
    const state = useAppStateStore();
    const tasks = state.tasks;
    return <div>
        <div className="row row-cols-1 row-cols-md-3 g-4" style={{padding: "1rem", width: "97.5vw"}}>
            {
                tasks.map(
                    (task: ITask) =>
                        <div key={task.id}>
                            <TaskMiniView state={state} task={task}/>
                        </div>
                )
            }
        </div>
    </div>
}
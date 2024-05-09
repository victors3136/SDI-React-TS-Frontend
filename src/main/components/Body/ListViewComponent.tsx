import useAppStateStore from "../../state/hidden/ApplicationStateStore";
import {TaskView} from "./TaskView";
import 'bootstrap/dist/css/bootstrap.min.css';

export const ListViewComponent = () => {
    const state = useAppStateStore();
    const tasks = state.tasks;
    return <div>
        <div className="row row-cols-1 row-cols-md-3 g-4" style={{padding: "1rem", width: "94%"}}>
            {
                tasks.map(
                    task =>
                        <div key={task.id}>
                            <TaskView state={state} task={task}/>
                        </div>
                )
            }
        </div>
    </div>
}
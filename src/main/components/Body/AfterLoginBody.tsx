import ApplicationState from "../../../state/public/ApplicationStateType";
import React, {useEffect} from "react";
import GetTaskPageCommand from "../../commands/read/GetTaskPageCommand";
import ConnectToSocketCommand from "../../commands/ConnectToSocketCommand";
import {TaskAddComponent} from "./forms/TaskAddComponent";
import {TaskViewComponent} from "./views/TaskViewComponent";
import {TaskEditComponent} from "./forms/TaskEditComponent";
import {SubtaskAddComponent} from "./forms/SubtaskAddComponent";
import {ListViewComponent} from "./views/ListViewComponent";
import {LoadingSpinnerComponent} from "./misc/LoadingSpinnerComponent";

const AfterLoginBody = (props: { state: ApplicationState }) => {
    useEffect(() => {
        const fetchAndConnect = async () => {
            new GetTaskPageCommand().execute(props.state);
            new ConnectToSocketCommand().execute(props.state);
        }
        setTimeout(fetchAndConnect, 500);
        // eslint-disable-next-line
    }, []);
    const state = props.state;
    return <>
        {
            (state.addingTask && <TaskAddComponent/>)
            || (state.viewedTask && <TaskViewComponent/>)
            || (state.editedTask && <TaskEditComponent/>)
            || (state.addingChildrenForATaskID && <SubtaskAddComponent/>)
            || (state.tasks.length && <ListViewComponent/>)
            || (state.morePagesAvailable && <LoadingSpinnerComponent/>)
            || (<h1> Add a task by pressing the + button! </h1>)
        }
    </>;
}
export default AfterLoginBody;
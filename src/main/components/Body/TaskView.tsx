import ITask from "../../state/interface-task";

export const TaskView = (task: ITask) => {
    return <>
        <p>{task.name}</p>
        <p>{task.description}</p>
    </>;
};
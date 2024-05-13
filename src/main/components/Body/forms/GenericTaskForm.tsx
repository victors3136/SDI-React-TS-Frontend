import ITask from "../../../../state/public/ITask";
import React, {useState} from "react";
import {FaRegSave, FaRegWindowClose} from "react-icons/fa";
import '../../../../styling/public/css/App.css';
import Task from "../../../../state/hidden/Task";
import TaskBase from "../../../../state/public/TaskBase";
import useAppStateStore from "../../../../state/hidden/ApplicationStateStore";

const isValidBasisForCreatingATask = (fields: TaskBase) =>
    (fields.name.length > 0) &&
    (!!fields.description) &&
    (fields.priority <= 10) &&
    (fields.priority >= 1) &&
    (!!fields.dueDate);

export const GenericTaskForm = ({submit, defaultFieldValues, cleanup}: {
    submit: (task: ITask) => void,
    defaultFieldValues: ITask,
    cleanup: () => void
}) => {
    const {setErrorMessage} = useAppStateStore.getState();
    const [name, setName] = useState(defaultFieldValues.name);
    const [description, setDescription] = useState(defaultFieldValues.description ?? "");
    const [priority, setPriority] = useState(defaultFieldValues.priority);
    const [dueDate, setDueDate] = useState(defaultFieldValues.dueDate);
    return <div className="Div-Covering-The-Whole-Screen-Semitransparent">
        <div>
            <form onSubmit={() => {
                const base: TaskBase = {name, description, priority, dueDate};
                if (isValidBasisForCreatingATask(base)) {
                    const task = new Task(base);
                    submit(task);
                } else {
                    setErrorMessage("The entity is not valid");
                }
                cleanup();
            }}>
                <div>
                    <label>Task Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={change => setName(change.target.value)}
                    />
                </div>
                <div>
                    <label>Task Description: </label>
                    <input
                        type="text"
                        value={description}
                        onChange={change => setDescription(change.target.value)}/>
                </div>
                <div>
                    <label>Task Priority: </label>
                    <input
                        type="number"
                        min="0"
                        max="10"
                        value={priority}
                        onChange={change => setPriority(parseInt(change.target.value))}/>
                </div>
                <div>
                    <label>Due time: </label>
                    <input type="date"
                           value={dueDate.toLocaleString()}
                           onChange={change => setDueDate(new Date(change.target.value))}/>
                </div>
                <div>
                    <button type="submit"
                            className="Only-Icon-Button"><FaRegSave className="Larger-Icon"/>
                    </button>
                    <button type="button" onClick={cleanup}
                            className="Only-Icon-Button"><FaRegWindowClose className="Larger-Icon"/>
                    </button>
                </div>
            </form>
        </div>
    </div>
}
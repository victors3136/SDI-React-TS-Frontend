import ISubtask from "../../../../state/public/ISubtask";
import React, {useState} from "react";
import Subtask from "../../../../state/hidden/Subtask";
import {FaRegSave, FaRegWindowClose} from "react-icons/fa";

export const GenericSubtaskForm = ({submit, defaultFieldValues, cleanup}: {
    submit: (subtask: ISubtask) => void,
    defaultFieldValues: ISubtask,
    cleanup: () => void
}) => {
    const [subject, setSubject] = useState(defaultFieldValues.subject);
    return <div className="Div-Covering-The-Whole-Screen-Semitransparent">
        <div>
            <form onSubmit={() => {
                submit(new Subtask({subject: subject, task: defaultFieldValues.task, done: false}));
                cleanup();
            }}>
                <div>
                    <label>Subtask Subject: </label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(change) => setSubject(change.target.value)}
                    />
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
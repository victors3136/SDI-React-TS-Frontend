import React, {useState} from "react";
import {FaRegWindowClose} from "react-icons/fa";
import useAppStateStore from "../../../../state/hidden/ApplicationStateStore";
import {LoginCommand} from "../../../commands/LoginCommand";
import {IoMdSend} from "react-icons/io";

const LoginForm = () => {
    const state = useAppStateStore();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const cleanup = () => state.setLogging(false);
    return <div className="Div-Covering-The-Whole-Screen-Semitransparent">
        <div>
            <form onSubmit={() => {
                new LoginCommand({username, password}).execute(state);
                cleanup();
            }}>
                <div>
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(change) => setUsername(change.target.value)}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(change) => setPassword(change.target.value)}
                    />
                </div>
                <div>
                    <button type="submit"
                            className="Only-Icon-Button"><IoMdSend className="Larger-Icon"/>
                    </button>
                    <button type="button" onClick={cleanup}
                            className="Only-Icon-Button"><FaRegWindowClose className="Larger-Icon"/>
                    </button>
                </div>
            </form>
        </div>
    </div>
};
export default LoginForm;
import useAppStateStore from "../../../../state/hidden/ApplicationStateStore";
import React, {useState} from "react";
import {IoMdSend} from "react-icons/io";
import {FaRegWindowClose} from "react-icons/fa";
import {RegisterCommand} from "../../../commands/RegisterCommand";

const validUsername = (input: string) => {
    return input.match("^[0-9a-zA-Z_]{4,32}$");
}
const validPassword = (input: string) => {
    return input.match("^[0-9a-zA-Z_?!.]{8,64}$");
}
const validEmail = (input: string) => {
    return input.match("^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
}
const RegisterForm = () => {
    const state = useAppStateStore();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const cleanup = () => state.setRegistering(false);
    return <div className="Div-Covering-The-Whole-Screen-Semitransparent">
        <div>
            <form onSubmit={() => {
                console.log("Form submitted");
                if (!validUsername(username)) {
                    state.setErrorMessage("A username must be between 4 and 32 characters and only contain letters, digits, or '_'");
                    return;
                }
                if (!validPassword(password)) {
                    state.setErrorMessage("A passwords must be between 8 and 64 characters and only contain letters, digits, , '_', '.', '?','!' or ' '");
                    return;
                }
                if (!validEmail(email)) {
                    state.setErrorMessage("Invalid email address");
                    return;
                }
                new RegisterCommand({username, password, email}).execute(state);
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
                    <label>Email: </label>
                    <input
                        type="text"
                        value={email}
                        onChange={(change) => setEmail(change.target.value)}
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
                    <label>Confirm Password: </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(change) => setConfirmPassword(change.target.value)}
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
export default RegisterForm;
import ApplicationState from "../../../state/public/ApplicationStateType";
import {HttpStatusCode} from "axios";

export const handleCommandResponseProblemStatus: (response: { status: number }, state: ApplicationState) => void =
    (response, state) => {
        switch (response.status) {
            case HttpStatusCode.BadRequest:
                state.setErrorMessage('Server-side validation failed');
                break;
            case HttpStatusCode.Unauthorized:
                state.setErrorMessage('You need to log in again to continue');
                break;
            case HttpStatusCode.Forbidden:
                state.setErrorMessage('You cannot do that!');
                break;
            case HttpStatusCode.NotFound:
                state.setErrorMessage('Not found');
                break;
            default:
                state.setErrorMessage(`Unexpected response: ${response.status}`);
        }
    }

import React from 'react';
import './styling/public/css/App.css';
import useAppStateStore from "./state/hidden/ApplicationStateStore";
import {Main} from "./main/Main";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./main/Home";
import {ErrorViewComponent} from "./main/components/Body/views/ErrorViewComponent";

const App: React.FC<any> = () => {
    const state = useAppStateStore();
    const styleProvider = state.colorSchemeProvider;
    return (
        <div className='App'
             style={{
                 color: styleProvider.textColor(),
                 background: styleProvider.backgroundColor(),
                 borderColor: styleProvider.accentColor(),
                 boxShadow: styleProvider.accentColor()
             }}>
            {
                (state.errorMessage && <ErrorViewComponent/>)
                || ((state.jsonWebToken)
                    ? <Main/>
                    : <Home/>)
            }
        </div>
    );
}

export default App;

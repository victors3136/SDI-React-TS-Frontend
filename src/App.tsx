import React from 'react';
import './styling/public/css/App.css';
import useAppStateStore from "./main/state/hidden/ApplicationStateStore";
import {Main} from "./main/Main";
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC<any> = () => {
    const state = useAppStateStore();
    const styleProvider = state.colorSchemeProvider;
    console.log("Renderuing app");
    return (
        <div className='App'
             style={{
                 color: styleProvider.textColor(),
                 background: styleProvider.backgroundColor(),
                 borderColor: styleProvider.accentColor(),
                 boxShadow: styleProvider.accentColor()
             }}>
            <Main/>
        </div>
    );
}

export default App;

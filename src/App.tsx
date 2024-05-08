import React from 'react';
import './styling/App.css';
import useAppStateStore from "./main/state/application-state-store";
import {Main} from "./main/Main";

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
            <Main/>
        </div>
    );
}

export default App;

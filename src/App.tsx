import React, {JSXElementConstructor} from 'react';
import './styling/App.css';
import useAppStateStore from "./main/state/application-state-store";
import Header from "./main/Header";
import styleCyclist from "./styling/styleCyclist";

const App: JSXElementConstructor<any> = () => {
    const state = useAppStateStore();
    const styleProvider = state.styleFactory;
    return (
        <div className='App'
             style={{
                 color: styleProvider.textColor(),
                 background: styleProvider.backgroundColor(),
                 borderColor: styleProvider.accentColor(),
                 boxShadow: styleProvider.accentColor()
             }}>
            <Header/>
            <div className="inherit-color-scheme">
                <button onClick={() => state.setStyleFactory(styleCyclist().instantiate())}
                        className="inherit-color-scheme">
                    Change style
                </button>
            </div>
        </div>
    );
}

export default App;

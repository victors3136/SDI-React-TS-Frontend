// noinspection JSVoidFunctionReturnValueUsed

import useAppStateStore from "../../src/main/state/application-state-store";
import Header from "./components/HeaderComponent";
import Body from "./components/BodyComponent";
import Footer from "./components/FooterComponent";
import React, {useEffect} from "react";
import GetTaskPageCommand from "./commands/read/GetTaskPageCommand";

export const Main = () => {
    const state = useAppStateStore();
    console.log("Mainin");
    useEffect(() => {
        console.log("YAAR");
        new GetTaskPageCommand().execute(state);
    }, []);

    return <>
        <Header/>
        <Body/>
        <Footer/>
    </>;
}
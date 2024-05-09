import useAppStateStore from "../state/hidden/ApplicationStateStore";
import Header from "./components/HeaderComponent";
import Body from "./components/BodyComponent";
import Footer from "./components/FooterComponent";
import React, {useEffect} from "react";
import GetTaskPageCommand from "./commands/read/GetTaskPageCommand";

export const Main = () => {
    const state = useAppStateStore();
    useEffect(() => {
        new GetTaskPageCommand().execute(state);
        // eslint-disable-next-line
    }, []);

    return <>
        <Header/>
        <Body state={state}/>
        <Footer state={state}/>
    </>;
}
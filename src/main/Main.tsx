import useAppStateStore from "../state/hidden/ApplicationStateStore";
import Header from "./components/HeaderComponent";
import Body from "./components/BodyComponent";
import Footer from "./components/FooterComponent";
import React, {useEffect} from "react";
import GetTaskPageCommand from "./commands/read/GetTaskPageCommand";
import ConnectToSocketCommand from "./commands/ConnectToSocketCommand";

export const Main = () => {
    const state = useAppStateStore();

    useEffect(() => {
        const fetchAndConnect = async () => {
            new GetTaskPageCommand().execute(state);
            new ConnectToSocketCommand().execute(state);
        }
        fetchAndConnect();
        // eslint-disable-next-line
    }, []);

    return <>
        <Header/>
        <Body state={state}/>
        <Footer state={state}/>
    </>;
}
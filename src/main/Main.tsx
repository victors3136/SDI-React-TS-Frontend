import useAppStateStore from "../state/hidden/ApplicationStateStore";
import Header from "./components/HeaderComponent";
import Body from "./components/BodyComponent";
import Footer from "./components/FooterComponent";
import React from "react";

export const Main = () => {
    const state = useAppStateStore();

    return <>
        <Header/>
        <Body state={state}/>
        <Footer state={state}/>
    </>;
}
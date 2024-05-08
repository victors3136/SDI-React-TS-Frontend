import ApplicationState from "./state/interface-application-state-store";
import Header from "./components/HeaderComponent";
import Body from "./components/BodyComponent";
import Footer from "./components/FooterComponent";
import React from "react";

export const Main = (props: { state: ApplicationState }) =>
    <>
        <Header/>
        <Body/>
        <Footer/>
    </>
import LightColorSchemeProvider from "./color-scheme-providers/LightColorSchemeProvider";
import DarkColorSchemeProvider from "./color-scheme-providers/DarkColorSchemeProvider";
import GirlyColorSchemeProvider from "./color-scheme-providers/GirlyColorSchemeProvider";
import EdgyColorSchemeProvider from "./color-scheme-providers/EdgyColorSchemeProvider";
import NatureColorSchemeProvider from "./color-scheme-providers/NatureColorSchemeProvider";
import BeehiveColorSchemeProvider from "./color-scheme-providers/BeehiveColorSchemeProvider";

const styleFactories = [
    DarkColorSchemeProvider,
    LightColorSchemeProvider,
    GirlyColorSchemeProvider,
    EdgyColorSchemeProvider,
    NatureColorSchemeProvider,
    BeehiveColorSchemeProvider
];

let currentIndex = 1;

const styleCyclist = () => {
    const currentStyleFactory = styleFactories[currentIndex];
    currentIndex = (currentIndex + 1) % styleFactories.length;
    return currentStyleFactory;
};

export default styleCyclist;
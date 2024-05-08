import LightColorSchemeProvider from "./color-scheme-providers/LightColorSchemeProvider";
import DarkColorSchemeProvider from "./color-scheme-providers/DarkColorSchemeProvider";
import GirlyColorSchemeProvider from "./color-scheme-providers/GirlyColorSchemeProvider";
import EdgyColorSchemeProvider from "./color-scheme-providers/EdgyColorSchemeProvider";
import NatureColorSchemeProvider from "./color-scheme-providers/NatureColorSchemeProvider";
import BeehiveColorSchemeProvider from "./color-scheme-providers/BeehiveColorSchemeProvider";

const colorSchemeProviders = [
    DarkColorSchemeProvider.instantiate(),
    LightColorSchemeProvider.instantiate(),
    GirlyColorSchemeProvider.instantiate(),
    EdgyColorSchemeProvider.instantiate(),
    NatureColorSchemeProvider.instantiate(),
    BeehiveColorSchemeProvider.instantiate()
];

let currentIndex = 1;

const styleCyclist = () => {
    const currentColorSchemeProvider = colorSchemeProviders[currentIndex];
    currentIndex = (currentIndex + 1) % colorSchemeProviders.length;
    return currentColorSchemeProvider;
};

export default styleCyclist;
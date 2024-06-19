import LightColorSchemeProvider from "../hidden/LightColorSchemeProvider";
import EdgyColorSchemeProvider from "../hidden/EdgyColorSchemeProvider";
import NatureColorSchemeProvider from "../hidden/NatureColorSchemeProvider";
import BeehiveColorSchemeProvider from "../hidden/BeehiveColorSchemeProvider";
import DarkColorSchemeProvider from "../hidden/DarkColorSchemeProvider";
import GirlyColorSchemeProvider from "../hidden/GirlyColorSchemeProvider";

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
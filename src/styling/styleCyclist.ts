import LightColorSchemeFactory from "./color-scheme-providers/LightColorSchemeFactory";
import DarkColorSchemeFactory from "./color-scheme-providers/DarkColorSchemeFactory";
import GirlyColorSchemeFactory from "./color-scheme-providers/GirlyColorSchemeFactory";
import EdgyColorSchemeFactory from "./color-scheme-providers/EdgyColorSchemeFactory";
import NatureColorSchemeFactory from "./color-scheme-providers/NatureColorSchemeFactory";
import BeehiveColorSchemeFactory from "./color-scheme-providers/BeehiveColorSchemeFactory";
import EyeSoreColorSchemeFactory from "./color-scheme-providers/EyeSoreColorSchemeFactory";

const styleFactories = [
    DarkColorSchemeFactory,
    LightColorSchemeFactory,
    GirlyColorSchemeFactory,
    EdgyColorSchemeFactory,
    NatureColorSchemeFactory,
    BeehiveColorSchemeFactory,
    EyeSoreColorSchemeFactory
];

let currentIndex = 1;

const styleCyclist = () => {
    const currentStyleFactory = styleFactories[currentIndex];
    currentIndex = (currentIndex + 1) % styleFactories.length;
    return currentStyleFactory;
};

export default styleCyclist;
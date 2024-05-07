interface IColorSchemeFactory {
    textColor: () => string;
    backgroundColor: () => string;
    accentColor: () => string;
    headerBgColor: () => string;
}

export default IColorSchemeFactory;
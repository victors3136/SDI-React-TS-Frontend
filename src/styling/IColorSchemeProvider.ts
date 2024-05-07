interface IColorSchemeProvider {
    textColor: () => string;
    backgroundColor: () => string;
    accentColor: () => string;
    headerBgColor: () => string;
}

export default IColorSchemeProvider;
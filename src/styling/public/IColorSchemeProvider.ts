interface IColorSchemeProvider {
    textColor: () => string;
    backgroundColor: () => string;
    accentColor: () => string;
    headerBgColor: () => string;
    maxPriorityColor: () => string;
    minPriorityColor: () => string;
    errorColor: () => string;
}

export default IColorSchemeProvider;
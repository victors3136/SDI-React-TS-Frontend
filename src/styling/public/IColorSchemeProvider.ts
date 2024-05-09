interface IColorSchemeProvider {
    textColor: () => string;
    backgroundColor: () => string;
    accentColor: () => string;
    headerBgColor: () => string;
    maxPriorityColor: () => string;
    minPriorityColor: () => string;
}

export default IColorSchemeProvider;
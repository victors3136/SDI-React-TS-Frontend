import IColorSchemeProvider from "../IColorSchemeProvider";

class EdgyColorSchemeProvider implements IColorSchemeProvider {

    textColor = () => "#ff0000";
    backgroundColor = () => "#320207";
    accentColor = () => "#3bff00";
    headerBgColor = () => "#555454";

    private static instance: IColorSchemeProvider;

    static instantiate = () => {
        EdgyColorSchemeProvider.instance ??= new EdgyColorSchemeProvider();
        return EdgyColorSchemeProvider.instance;
    }

    private constructor() {
    }

}

export default EdgyColorSchemeProvider;
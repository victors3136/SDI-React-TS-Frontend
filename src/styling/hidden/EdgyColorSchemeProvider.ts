import IColorSchemeProvider from "../public/IColorSchemeProvider";

class EdgyColorSchemeProvider implements IColorSchemeProvider {

    textColor = () => "#aaa6a6";
    backgroundColor = () => "#37292a";
    accentColor = () => "#154e04";
    headerBgColor = () => "#555454";
    maxPriorityColor = () => "#510202";
    minPriorityColor = () => "#40074c";
    errorColor = () => "#b18103";

    private static instance: IColorSchemeProvider;

    static instantiate = () => {
        EdgyColorSchemeProvider.instance ??= new EdgyColorSchemeProvider();
        return EdgyColorSchemeProvider.instance;
    }

    private constructor() {
    }

}

export default EdgyColorSchemeProvider;
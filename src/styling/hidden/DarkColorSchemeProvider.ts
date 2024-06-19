import IColorSchemeProvider from "../public/IColorSchemeProvider";

class DarkColorSchemeProvider implements IColorSchemeProvider {

    textColor = () => "#9eb4e6";
    backgroundColor = () => "#1d2c40";
    accentColor = () => "#00618f";
    headerBgColor = () => "#464d4e";
    maxPriorityColor = () => "#050a12";
    minPriorityColor = () => "#263447";
    errorColor = () => "#b83f1a";

    private static instance: IColorSchemeProvider;

    static instantiate = () => {
        DarkColorSchemeProvider.instance ??= new DarkColorSchemeProvider();
        return DarkColorSchemeProvider.instance;
    }

    private constructor() {
    }

}

export default DarkColorSchemeProvider;
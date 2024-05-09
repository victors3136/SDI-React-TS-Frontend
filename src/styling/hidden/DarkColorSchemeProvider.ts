import IColorSchemeProvider from "../public/IColorSchemeProvider";

class DarkColorSchemeProvider implements IColorSchemeProvider {

    textColor = () => "#9eb4e6";
    backgroundColor = () => "#1d2c40";
    accentColor = () => "#00618f";
    headerBgColor = () => "#885d1b";
    maxPriorityColor = () => "#950303";
    minPriorityColor = () => "#338703";
    errorColor = () => "#aaff00";

    private static instance: IColorSchemeProvider;

    static instantiate = () => {
        DarkColorSchemeProvider.instance ??= new DarkColorSchemeProvider();
        return DarkColorSchemeProvider.instance;
    }

    private constructor() {
    }

}

export default DarkColorSchemeProvider;
import IColorSchemeProvider from "../IColorSchemeProvider";

class DarkColorSchemeProvider implements IColorSchemeProvider {

    textColor = () => "#9eb4e6";
    backgroundColor = () => "#1d2c40";
    accentColor = () => "#00618f";
    headerBgColor = () => "#885d1b";

    private static instance: IColorSchemeProvider;

    static instantiate = () => {
        DarkColorSchemeProvider.instance ??= new DarkColorSchemeProvider();
        return DarkColorSchemeProvider.instance;
    }

    private constructor() {
    }

}

export default DarkColorSchemeProvider;
import IColorSchemeProvider from "../IColorSchemeProvider";

class LightColorSchemeProvider implements IColorSchemeProvider {

    textColor = () => "#000000";
    backgroundColor = () => "#819bb8";
    accentColor = () => "#005481";
    headerBgColor = () => "#c98f37";

    private static instance: IColorSchemeProvider;

    static instantiate = () => {
        LightColorSchemeProvider.instance ??= new LightColorSchemeProvider();
        return LightColorSchemeProvider.instance;
    }

    private constructor() {
    }

}

export default LightColorSchemeProvider;
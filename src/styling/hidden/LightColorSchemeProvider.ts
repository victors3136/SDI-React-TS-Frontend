import IColorSchemeProvider from "../public/IColorSchemeProvider";

class LightColorSchemeProvider implements IColorSchemeProvider {

    textColor = () => "#000000";
    backgroundColor = () => "#819bb8";
    accentColor = () => "#005481";
    headerBgColor = () => "#c98f37";
    maxPriorityColor = () => "#c63737";
    minPriorityColor = () => "#cdcbcb";

    private static instance: IColorSchemeProvider;

    static instantiate = () => {
        LightColorSchemeProvider.instance ??= new LightColorSchemeProvider();
        return LightColorSchemeProvider.instance;
    }

    private constructor() {
    }

}

export default LightColorSchemeProvider;
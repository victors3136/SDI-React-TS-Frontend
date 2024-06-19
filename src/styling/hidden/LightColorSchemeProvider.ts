import IColorSchemeProvider from "../public/IColorSchemeProvider";

class LightColorSchemeProvider implements IColorSchemeProvider {

    textColor = () => "#000000";
    backgroundColor = () => "#b4bcc5";
    accentColor = () => "#005481";
    headerBgColor = () => "#877659";
    maxPriorityColor = () => "#bd4141";
    minPriorityColor = () => "#d88f47";
    errorColor = () => "#fb0000";

    private static instance: IColorSchemeProvider;

    static instantiate = () => {
        LightColorSchemeProvider.instance ??= new LightColorSchemeProvider();
        return LightColorSchemeProvider.instance;
    }

    private constructor() {
    }

}

export default LightColorSchemeProvider;
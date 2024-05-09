import IColorSchemeProvider from "../public/IColorSchemeProvider";

class NatureColorSchemeProvider implements IColorSchemeProvider {

    textColor = () => "#000000";
    backgroundColor = () => "#558546";
    accentColor = () => "#ac4d04";
    headerBgColor = () => "#437500";
    maxPriorityColor = () => "#7a9308";
    minPriorityColor = () => "#714c16";

    private static instance: IColorSchemeProvider;

    static instantiate = () => {
        NatureColorSchemeProvider.instance ??= new NatureColorSchemeProvider();
        return NatureColorSchemeProvider.instance;
    }

    private constructor() {
    }
}

export default NatureColorSchemeProvider;
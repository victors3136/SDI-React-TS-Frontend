import IColorSchemeProvider from "../public/IColorSchemeProvider";

class NatureColorSchemeProvider implements IColorSchemeProvider {

    textColor = () => "#000000";
    backgroundColor = () => "#558546";
    accentColor = () => "#ac4d04";
    headerBgColor = () => "#437500";
    maxPriorityColor = () => "#d2ff00";
    minPriorityColor = () => "#513100";
    errorColor = () => "#cc3000";

    private static instance: IColorSchemeProvider;

    static instantiate = () => {
        NatureColorSchemeProvider.instance ??= new NatureColorSchemeProvider();
        return NatureColorSchemeProvider.instance;
    }

    private constructor() {
    }
}

export default NatureColorSchemeProvider;
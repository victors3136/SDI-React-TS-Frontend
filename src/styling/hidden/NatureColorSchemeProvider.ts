import IColorSchemeProvider from "../public/IColorSchemeProvider";

class NatureColorSchemeProvider implements IColorSchemeProvider {

    textColor = () => "#2c202c";
    backgroundColor = () => "#558546";
    accentColor = () => "#ac4d04";
    headerBgColor = () => "#437500";
    maxPriorityColor = () => "#86914c";
    minPriorityColor = () => "#679e53";
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
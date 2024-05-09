import IColorSchemeProvider from "../public/IColorSchemeProvider";

class BeehiveColorSchemeProvider implements IColorSchemeProvider {

    textColor = () => "#272118";
    backgroundColor = () => "#ffa400";
    accentColor = () => "#593902";
    headerBgColor = () => "#d8ad00";
    maxPriorityColor = () => "#9c2b00";
    minPriorityColor = () => "#85752e";
    errorColor = () => "#ff0000";
    private static instance: IColorSchemeProvider;

    static instantiate = () => {
        BeehiveColorSchemeProvider.instance ??= new BeehiveColorSchemeProvider();
        return BeehiveColorSchemeProvider.instance;
    }

    private constructor() {
    }

}

export default BeehiveColorSchemeProvider;
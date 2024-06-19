import IColorSchemeProvider from "../public/IColorSchemeProvider";

class BeehiveColorSchemeProvider implements IColorSchemeProvider {

    textColor = () => "#272118";
    backgroundColor = () => "#8a6a30";
    accentColor = () => "#593902";
    headerBgColor = () => "#d87300";
    maxPriorityColor = () => "#915943";
    minPriorityColor = () => "#734532";
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
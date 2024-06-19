import IColorSchemeProvider from "../public/IColorSchemeProvider";

class GirlyColorSchemeProvider implements IColorSchemeProvider {

    textColor = () => "#eda8de";
    backgroundColor = () => "#5e3352";
    accentColor = () => "#8c043c";
    headerBgColor = () => "#522c6e";
    maxPriorityColor = () => "#653c59";
    minPriorityColor = () => "#5c3c65";
    errorColor = () => "#ff0188";

    private static instance: IColorSchemeProvider;

    static instantiate = () => {
        GirlyColorSchemeProvider.instance ??= new GirlyColorSchemeProvider();
        return GirlyColorSchemeProvider.instance;
    }

    private constructor() {
    }

}

export default GirlyColorSchemeProvider;
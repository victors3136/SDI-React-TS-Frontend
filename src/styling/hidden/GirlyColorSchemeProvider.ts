import IColorSchemeProvider from "../public/IColorSchemeProvider";

class GirlyColorSchemeProvider implements IColorSchemeProvider {

    textColor = () => "#170112";
    backgroundColor = () => "#954f80";
    accentColor = () => "#ae0048";
    headerBgColor = () => "#8d56b6";
    maxPriorityColor = () => "#710050";
    minPriorityColor = () => "#442b91";

    private static instance: IColorSchemeProvider;

    static instantiate = () => {
        GirlyColorSchemeProvider.instance ??= new GirlyColorSchemeProvider();
        return GirlyColorSchemeProvider.instance;
    }

    private constructor() {
    }

}

export default GirlyColorSchemeProvider;
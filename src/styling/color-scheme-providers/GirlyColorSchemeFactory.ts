import IColorSchemeFactory from "../IColorSchemeFactory";

class GirlyColorSchemeFactory implements IColorSchemeFactory {

    private static instance: IColorSchemeFactory;
    public textColor: () => string = () => "#170112";
    public backgroundColor: () => string = () => "#954f80";
    public accentColor: () => string = () => "#ae0048";
    public headerBgColor: () => string = () => "#8d56b6";

    private constructor() {
    }

    static instantiate: () => IColorSchemeFactory = () => {
        GirlyColorSchemeFactory.instance ??= new GirlyColorSchemeFactory();
        return GirlyColorSchemeFactory.instance;
    }
}

export default GirlyColorSchemeFactory;
import IColorSchemeFactory from "../IColorSchemeFactory";

class BeehiveColorSchemeFactory implements IColorSchemeFactory {

    private static instance: IColorSchemeFactory;
    public textColor: () => string = () => "#272118";
    public backgroundColor: () => string = () => "#ffa400";
    public accentColor: () => string = () => "#593902";
    public headerBgColor: () => string = () => "#d8ad00";

    private constructor() {
    }

    static instantiate: () => IColorSchemeFactory = () => {
        BeehiveColorSchemeFactory.instance ??= new BeehiveColorSchemeFactory();
        return BeehiveColorSchemeFactory.instance;
    }
}

export default BeehiveColorSchemeFactory;
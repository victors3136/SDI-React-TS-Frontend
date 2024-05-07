import IColorSchemeFactory from "../IColorSchemeFactory";

class NatureColorSchemeFactory implements IColorSchemeFactory {

    private static instance: IColorSchemeFactory;
    public textColor: () => string = () => "#000000";
    public backgroundColor: () => string = () => "#558546";
    public accentColor: () => string = () => "#ac4d04";
    public headerBgColor: () => string = () => "#437500";

    private constructor() {
    }

    static instantiate: () => IColorSchemeFactory = () => {
        NatureColorSchemeFactory.instance ??= new NatureColorSchemeFactory();
        return NatureColorSchemeFactory.instance;
    }
}

export default NatureColorSchemeFactory;
import IColorSchemeFactory from "../IColorSchemeFactory";

class DarkColorSchemeFactory implements IColorSchemeFactory {

    private static instance: IColorSchemeFactory;
    public textColor: () => string = () => "#9eb4e6";
    public backgroundColor: () => string = () => "#1d2c40";
    public accentColor: () => string = () => "#00618f";
    public headerBgColor: () => string = () => "#885d1b";

    private constructor() {
    }

    static instantiate: () => IColorSchemeFactory = () => {
        DarkColorSchemeFactory.instance ??= new DarkColorSchemeFactory();
        return DarkColorSchemeFactory.instance;
    }
}

export default DarkColorSchemeFactory;
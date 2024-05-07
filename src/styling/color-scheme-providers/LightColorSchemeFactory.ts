import IColorSchemeFactory from "../IColorSchemeFactory";

class LightColorSchemeFactory implements IColorSchemeFactory {

    private static instance: IColorSchemeFactory;
    public textColor: () => string = () => "#000000";
    public backgroundColor: () => string = () => "#819bb8";
    public accentColor: () => string = () => "#005481";
    public headerBgColor: () => string = () => "#c98f37";

    private constructor() {
    }

    static instantiate: () => IColorSchemeFactory = () => {
        LightColorSchemeFactory.instance ??= new LightColorSchemeFactory();
        return LightColorSchemeFactory.instance;
    }
}

export default LightColorSchemeFactory;
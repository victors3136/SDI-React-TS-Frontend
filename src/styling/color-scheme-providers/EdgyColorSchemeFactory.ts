import IColorSchemeFactory from "../IColorSchemeFactory";

class EdgyColorSchemeFactory implements IColorSchemeFactory {

    private static instance: IColorSchemeFactory;
    public textColor: () => string = () => "#ff0000";
    public backgroundColor: () => string = () => "#320207";
    public accentColor: () => string = () => "#3bff00";
    public headerBgColor: () => string = () => "#555454";

    private constructor() {
    }

    static instantiate: () => IColorSchemeFactory = () => {
        EdgyColorSchemeFactory.instance ??= new EdgyColorSchemeFactory();
        return EdgyColorSchemeFactory.instance;
    }
}

export default EdgyColorSchemeFactory;
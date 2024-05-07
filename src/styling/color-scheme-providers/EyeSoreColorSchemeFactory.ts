import IColorSchemeFactory from "../IColorSchemeFactory";

class NewStyle implements IColorSchemeFactory {

    private static instance: IColorSchemeFactory;
    public textColor: () => string = () => "#0052ff";
    public backgroundColor: () => string = () => "#ff6100";
    public accentColor: () => string = () => "#00ff6a";
    public headerBgColor: () => string = () => "#8800ff";

    private constructor() {
    }

    static instantiate: () => IColorSchemeFactory = () => {
        NewStyle.instance ??= new NewStyle();
        return NewStyle.instance;
    }
}

export default NewStyle;
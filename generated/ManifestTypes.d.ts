/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    Text: ComponentFramework.PropertyTypes.StringProperty;
    Delay: ComponentFramework.PropertyTypes.FloatingNumberProperty;
    ButtonStyle: ComponentFramework.PropertyTypes.EnumProperty<"text" | "outlined" | "contained">;
    ButtonSize: ComponentFramework.PropertyTypes.EnumProperty<"small" | "medium" | "large">;
    IconPosition: ComponentFramework.PropertyTypes.EnumProperty<"start" | "end">;
    BorderRadius: ComponentFramework.PropertyTypes.FloatingNumberProperty;
    Font: ComponentFramework.PropertyTypes.StringProperty;
    FontSize: ComponentFramework.PropertyTypes.WholeNumberProperty;
    FontColor: ComponentFramework.PropertyTypes.StringProperty;
    FontWeight: ComponentFramework.PropertyTypes.EnumProperty<"Lighter" | "Normal" | "Semibold" | "Bold">;
    PrimaryColor: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
    State?: string;
}

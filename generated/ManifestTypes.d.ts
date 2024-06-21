/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    Font: ComponentFramework.PropertyTypes.StringProperty;
    FontSize: ComponentFramework.PropertyTypes.WholeNumberProperty;
    FontColor: ComponentFramework.PropertyTypes.StringProperty;
    FontWeight: ComponentFramework.PropertyTypes.EnumProperty<"Lighter" | "Normal" | "Semibold" | "Bold">;
    PrimaryColor: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
}

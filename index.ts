import { IInputs, IOutputs } from "./generated/ManifestTypes";
import MUI_LoadingButton_Class from "./App";
import {IButtonProps} from "./longPressButton";
import * as React from "react";

export class LoadingButton implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private controlState: "ready" | "wait" | "cancel" | "submit";
    // private autoHeight: number;
    // private autoWidth: number;

    /**
     * Empty constructor.
     */
    constructor() {
        this.onChange = this.onChange.bind(this);
        // this.handleAutoSizing = this.handleAutoSizing.bind(this);
        // this.autoHeight=0;
        // this.autoWidth=0;
        this.controlState = "ready";
    }

    onChange(newValue: "ready" | "wait" | "submit"): void {
        // console.log("onChange called");
        // this.checkboxValue = newValue;
        this.controlState = newValue;
        this.notifyOutputChanged();
    }

    handleAutoSizing(height: number, width: number) {
        
        // this.autoHeight = height;
        // this.autoWidth = width;
        // console.log("Handle Auto Sizing Called: Height: " + this.autoHeight + " Width: " + this.autoWidth);
        this.notifyOutputChanged()

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        context.mode.trackContainerResize(true);
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        console.log("updateView called");
        const inputs = context.parameters
        const appTheme = context.fluentDesignLanguage?.tokenTheme
        const props: IButtonProps = 
            { 
                buttonText: inputs.Text.raw as string,
                buttonStyle: inputs.ButtonStyle.raw,
                buttonSize: inputs.ButtonSize.raw,
                cancelSeconds: inputs.Delay.raw as number,
                iconPosition: inputs.IconPosition.raw,
                appTheme: appTheme,
                isEnabled: context.mode.isControlDisabled,
                borderRadius: inputs.BorderRadius.raw as number,
                font: inputs.Font?.raw as string,
                fontSize: inputs.FontSize.raw as number,
                fontWeight: inputs.FontWeight.raw,
                fontColor: inputs.FontColor?.raw as string,
                primaryColor: inputs.PrimaryColor?.raw as string,
                containerHeight: context.mode.allocatedHeight,
                containerWidth: context.mode.allocatedWidth,
                onChange: this.onChange,
                reset: inputs.Reset.raw,
            };
        return React.createElement(
            MUI_LoadingButton_Class, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        console.log("set Output: " + this.controlState)
        return { 
            State: this.controlState
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}

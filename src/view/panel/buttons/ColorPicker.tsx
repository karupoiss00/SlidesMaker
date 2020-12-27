import React from "react";
import {SlideObjectType} from "../../../model/slide/Slide";
import {getSelectedObject, updateTextBox} from "../../../model/SlidesMaker";
import {dispatch, getAppState} from "../../../controls/StateManager";

interface ColorPickerProps {
    selectedObject: SlideObjectType | null;
    isDisabled: boolean;
}

export function ColorPicker(props: ColorPickerProps) {
    let defaultColor = "#ffffff";

    if (props.selectedObject && "text" in props.selectedObject.object)
    {
        defaultColor = props.selectedObject.object.font.fontColor;
    }

    return (
        <div
            style={{
                marginLeft: "10px",
                marginRight: "10px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                background: `${defaultColor}`,
            }}
        >
            <input
                type="color"
                value={defaultColor}
                onChange={(e) => {
                    const pickedColor: string = e.currentTarget.value;
                    if (props.selectedObject && "text" in props.selectedObject.object) {
                        dispatch(updateTextBox, {objectId: props.selectedObject.id, newTextBox: {...props.selectedObject.object, font: {...props.selectedObject.object.font, fontColor: pickedColor}}})
                    }

                    if (e.target.parentElement)
                        e.target.parentElement.style.background = e.target.value;
                }}
                style={{
                    opacity: "0",
                    display: "block",
                    height: "26px",
                    width: "26px",
                    border: "none",
                }}
                disabled={props.isDisabled}
            />
        </div>
    )
}
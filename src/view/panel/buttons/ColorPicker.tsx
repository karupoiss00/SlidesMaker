import React from "react";
import {SlideObjectType} from "../../../model/slide/Slide";

interface ColorPickerProps {
    selectedObject: SlideObjectType | null;
    defaultColor: string;
    dispatchPickedColor: Function;
}

export function ColorPicker(props: ColorPickerProps) {
    return (
        <div
            style={{
                marginLeft: "10px",
                marginRight: "10px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                background: `${props.defaultColor}`,
            }}
        >
            <input
                type="color"
                value={props.defaultColor}
                onChange={(e) => {
                    const pickedColor: string = e.currentTarget.value;
                    props.dispatchPickedColor(pickedColor);

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
            />
        </div>
    )
}
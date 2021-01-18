import React from "react";

interface ColorPickerProps {
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
                    if (e.target.parentElement)
                    {
                        props.dispatchPickedColor(pickedColor);
                        e.target.parentElement.style.background = pickedColor;
                    }
                }}
                style={{
                    opacity: "0",
                    display: "block",
                    height: "28px",
                    width: "26px",
                    border: "none",
                }}
            />
        </div>
    )
}
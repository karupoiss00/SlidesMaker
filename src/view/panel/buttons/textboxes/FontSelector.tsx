import React, {ReactNode} from "react";
import {SlideObjectType} from "../../../../model/slide/Slide";
import {updateTextBox} from "../../../../model/SlidesMaker";
import {dispatch} from "../../../../controls/StateManager";

interface FontSelectorProps {
    selectedObject: SlideObjectType | null;
}

function FontSelector(props: FontSelectorProps) {
    const fonts: Array<string> = ["Arial", "Arial Black", "Times New Roman", "Courier New", "Courier", "Verdana", "Georgia", "Palatino", "Garamond", "Bookman", "Tahoma", "Trebuchet MS", "Impact", "Comic Sans MS"];
    const options: Array<ReactNode> = [];
    for (let i = 0; i < 14; i++)
    {
        options.push(<option value={fonts[i]} key={i} style={{fontFamily: `${fonts[i]}`}}>{fonts[i]}</option>)
    }

    let defaultFont = "Arial";
    if (props.selectedObject && "font" in props.selectedObject.object)
    {
        defaultFont = props.selectedObject.object.font.fontName;
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "auto",
        }}>
            <select
                value={defaultFont}
                onInput={(e) => {
                    if (props.selectedObject && "font" in props.selectedObject.object) {
                        dispatch(updateTextBox, {objectId: props.selectedObject.id, newTextBox: {...props.selectedObject.object, font: {...props.selectedObject.object.font, fontName: String(e.currentTarget.value)}}})
                    }
                }}
                style={{
                    height: "60%",
                    width: "100px",
                    marginLeft: "10px",
                    marginRight: "10px",
                }}>
                {options}
            </select>
        </div>
    )
}

export  {FontSelector}
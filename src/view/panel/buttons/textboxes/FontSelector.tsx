import React, {ReactNode} from "react";
import {SlideObjectType} from "../../../../model/slide/Slide";
import {getSelectedObject, updateTextBox} from "../../../../model/SlidesMaker";
import {dispatch, getAppState} from "../../../../controls/StateManager";

function FontSelector() {
    const fonts: Array<string> = ["Arial", "Arial Black", "Times New Roman", "Courier New", "Courier", "Verdana", "Georgia", "Palatino", "Garamond", "Bookman", "Tahoma", "Trebuchet MS", "Impact", "Comic Sans MS"];

    const options: Array<ReactNode> = [];
    for (let i = 0; i < 14; i++)
    {
        options.push(<option value={fonts[i]} key={i}>{fonts[i]}</option>)
    }
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
        }}>
            <select
                onInput={(e) => {
                    const selectedObject: SlideObjectType | null = getSelectedObject(getAppState());
                    if (selectedObject && "text" in selectedObject.object) {
                        dispatch(updateTextBox, {objectId: selectedObject.id, newTextBox: {...selectedObject.object, font: {...selectedObject.object.font, fontName: String(e.currentTarget.value)}}})
                    }
                }}
                style={{
                    height: "50%",
                    width: "90px",
                    marginLeft: "10px",
                    marginRight: "10px",
                }}>
                {options}
            </select>
        </div>
    )
}

export  {FontSelector}
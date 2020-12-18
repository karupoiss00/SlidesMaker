import React, {ReactNode} from "react";
import {getSelectedObject, updateShapeWidth} from "../../model/SlidesMaker";
import AddStrokeWidth from "./res/shapes/addStrokeWidth.svg";
import {dispatch, getAppState} from "../../controls/StateManager";
import {SlideObjectType} from "../../model/slide/Slide";

interface StrokeWidthProps {
    value: string;
}

function StrokeWidthInput(props: StrokeWidthProps) {
    const options: Array<ReactNode> = [];
    for(let i = 0; i < 50; i += 2) {
        options.push(<option value={i} key={i}>{i}</option>)
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
                           if (selectedObject && "shapeType" in selectedObject.object) {
                               dispatch(updateShapeWidth, {objectId: selectedObject.id, newShapeWidth: Number(e.currentTarget.value)})
                           }
                   }}
                   style={{
                       height: "50%",
                       width: "40px",
                       marginLeft: "10px",
                       marginRight: "10px",
                   }}>
                {options}
            </select>
            <img  src={AddStrokeWidth} alt={"Oops!"} style={{marginLeft: "10px"}}/>
        </div>
    )
}

export  {StrokeWidthInput}
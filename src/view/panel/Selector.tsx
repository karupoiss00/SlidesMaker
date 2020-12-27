import React, {ReactNode} from "react";
import {getSelectedObject, updateShapeWidth} from "../../model/SlidesMaker";
import {dispatch, getAppState} from "../../controls/StateManager";
import {SlideObjectType} from "../../model/slide/Slide";

interface SelectorProps {
    value: string;
    optionsData: Array<number> | Array<string>;
    selectedObject: SlideObjectType | null;
}

function Selector(props: SelectorProps) {
    const options: Array<ReactNode> = [];
    for(let i = 0; i < props.optionsData.length; i++) {
        options.push(<option value={props.optionsData[i]} key={i}>{props.optionsData[i]}</option>);
    }

    let maxLength: number = 0;
    props.optionsData.forEach((element: number | string) => {
        if (element.toString.length > maxLength) {
            maxLength = element.toString.length;
        }
    });
    const rightBorder: number = 15;
    const charLength: number = 15;
    maxLength = maxLength * charLength + rightBorder;

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
        }}>
            <select
                   onInput={(e) => {
                           if (props.selectedObject && "shapeType" in props.selectedObject.object) {
                               dispatch(updateShapeWidth, {objectId: props.selectedObject.id, newShapeWidth: Number(e.currentTarget.value)})
                           }
                   }}
                   style={{
                       height: "50%",
                       width: {maxLength} + "px",
                       marginLeft: "10px",
                       marginRight: "10px",
                   }}>
                {options}
            </select>
        </div>
    )
}

export  {Selector}
import {addObjectOnSelectedSlide, updateShape} from "../../model/SlidesMaker";
import {Button} from "../controls/Button";
import styles from "./Panel.module.css";
import {PanelSection} from "./PanelSection";
import React from "react";
import {dispatch} from "../../controls/StateManager";
import {createShape} from "../../model/slide/slide_objects/shape/Shape";
import {ShapeType} from "../../model/slide/slide_objects/shape/ShapeType";
import {createRect} from "../../model/types/Rect";
import {createStyle} from "../../model/types/Style";
import {Colors} from "../../model/types/Colors";
import AddFigureIcon from "./res/shapes/addShape.svg";
import {NumberSelector} from "./buttons/NumberSelector";
import AddStrokeWidth from "./res/shapes/addStrokeWidth.svg";
import {SlideObjectType} from "../../model/slide/Slide";
import {ColorPicker} from "./buttons/ColorPicker";

interface ShapePanelProps {
    selectedObject: SlideObjectType | null;
}

export function ShapePanel(props: ShapePanelProps) {
    const shapePanelIsDisabled = !(props.selectedObject && "shapeType" in props.selectedObject.object);

    let defaultBackgroundColor = "#f24e1e";
    if (props.selectedObject && "style" in props.selectedObject.object)
    {
        defaultBackgroundColor = props.selectedObject.object.style.backgroundColor;
    }

    const strokeWidthOptions: Array<number> = [];
    for (let i = 0; i < 50; i += 2) {
        strokeWidthOptions.push(i)
    }

    let defaultStrokeWidth = 0;
    if (props.selectedObject && "style" in props.selectedObject.object)
    {
        defaultStrokeWidth = props.selectedObject.object.style.strokeWidth;
    }

    let defaultStrokeColor = "#2c2c2c";
    if (props.selectedObject && "style" in props.selectedObject.object)
    {
        defaultStrokeColor = props.selectedObject.object.style.strokeColor;
    }

    return (
        <PanelSection sectionName={"Shapes"}>
            <Button
                className={styles.panelSquareButton}
                onClick={() => {
                    dispatch(addObjectOnSelectedSlide, createShape(
                        ShapeType.RECTANGLE,
                        createRect(200, 200, 100, 100),
                        createStyle(Colors.BLACK, Colors.WHITE, 2)));
                }} >
                <img src={AddFigureIcon} alt={"Oops!"}/>
            </Button>
            <div style={{display: shapePanelIsDisabled ? "none" : "inline-flex"}}>
                <ColorPicker
                    selectedObject={props.selectedObject}
                    defaultColor={defaultBackgroundColor}
                    dispatchPickedColor={(pickedColor: string) => {
                        props.selectedObject && "style" in props.selectedObject.object &&
                        dispatch(updateShape, {objectId: props.selectedObject.id, newShape: {...props.selectedObject.object, style: {...props.selectedObject.object.style, backgroundColor: pickedColor}}})
                    }}
                />
                <img  src={AddStrokeWidth} alt={"Oops!"} style={{marginLeft: "10px"}}/>
                <NumberSelector
                    optionsData={strokeWidthOptions}
                    defaultNum={defaultStrokeWidth}
                    dispatchPickedOption={(pickedOption: string) => {
                        props.selectedObject && "style" in props.selectedObject.object &&
                        dispatch(updateShape, {objectId: props.selectedObject.id, newShape: {...props.selectedObject.object, style: {...props.selectedObject.object.style, strokeWidth: Number(pickedOption)}}})
                    }}
                />
                <ColorPicker
                    selectedObject={props.selectedObject}
                    defaultColor={defaultStrokeColor}
                    dispatchPickedColor={(pickedColor: string) => {
                        props.selectedObject && "style" in props.selectedObject.object &&
                        dispatch(updateShape, {objectId: props.selectedObject.id, newShape: {...props.selectedObject.object, style: {...props.selectedObject.object.style, strokeColor: pickedColor}}})
                    }}
                />
            </div>
        </PanelSection>
    )
}
import {addObjectOnSelectedSlide, updateShape} from "../../model/SlidesMaker";
import {Button} from "../controls/Button";
import styles from "./Panel.module.css";
import {PanelSection} from "./PanelSection";
import React, {useState} from "react";
import {dispatch} from "../../state/StateManager";
import AddFigureIcon from "./res/shapes/addShape.svg";
import {NumberSelector} from "./buttons/NumberSelector";
import AddStrokeWidth from "./res/shapes/addStrokeWidth.svg";
import {SlideObjectType} from "../../model/slide/Slide";
import {ColorPicker} from "./buttons/ColorPicker";
import {ShapeSelector} from "./buttons/ShapeSelector";

interface ShapePanelProps {
    selectedObject: SlideObjectType | null;
}

export function ShapePanel(props: ShapePanelProps) {
    const shapePanelIsDisabled = !(props.selectedObject && "shapeType" in props.selectedObject.object);
    const [isShapeTypesVisible, setShapeTypesVisibility] = useState(false);

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
                    setShapeTypesVisibility(!isShapeTypesVisible);
                }}>
                <img src={AddFigureIcon} alt={"Oops!"}/>
            </Button>
            <ShapeSelector visibility={isShapeTypesVisible} setVisibilityFn={setShapeTypesVisibility}></ShapeSelector>
            <div style={{display: shapePanelIsDisabled ? "none" : "inline-flex"}}>
                <ColorPicker
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
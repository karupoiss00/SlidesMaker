import {WebPictureUploader} from "./WebPictureUploader";
import {addObjectOnSelectedSlide, addPictureOnSlide} from "../../model/SlidesMaker";
import {Button} from "../controls/Button";
import styles from "./Panel.module.css";
import {addPictureFromLocalStorage} from "../../usecase/pictureUploader";
import UploadPictureIcon from "./res/pictures/uploadPic.svg";
import {PanelSection} from "./PanelSection";
import React from "react";
import {dispatch} from "../../controls/StateManager";
import {createShape} from "../../model/slide/slide_objects/shape/Shape";
import {ShapeType} from "../../model/slide/slide_objects/shape/ShapeType";
import {createRect} from "../../model/types/Rect";
import {createStyle} from "../../model/types/Style";
import {Colors} from "../../model/types/Colors";
import AddFigureIcon from "./res/shapes/addShape.svg";
import {Selector} from "./Selector";
import AddStrokeWidth from "./res/shapes/addStrokeWidth.svg";
import {SlideObjectType} from "../../model/slide/Slide";

interface ShapePanelProps {
    selectedObject: SlideObjectType | null;
}

export function ShapePanel(props: ShapePanelProps) {
    const strokeOptions: Array<number> = [];
    for(let i = 0; i < 50; i += 2) {
        strokeOptions.push(i)
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
            <Selector value={"0"} optionsData={strokeOptions} selectedObject={props.selectedObject}/>
            <img  src={AddStrokeWidth} alt={"Oops!"} style={{marginLeft: "10px"}}/>
        </PanelSection>
    )
}
import React from 'react';
import styles from './Panel.module.css';
import AppIcon from "./res/icon.svg";
import {SlideObjectType} from "../../model/slide/Slide";
import {PresentationPanel} from "./PresentationPanel";
import {SlidePanel} from "./SlidePanel";
import {TextBoxPanel} from "./TextBoxPanel";
import {ShapePanel} from "./ShapePanel";
import {PicturePanel} from "./PicturePanel";

interface PanelProps {
    selectedObject: SlideObjectType | null;
}

function Panel(props: PanelProps) {
    return (
        <div className={styles.panelBar}>
            <img style={{marginLeft: "25px"}} src={AppIcon} alt={"Oops!"}/>
            <PresentationPanel/>
            <SlidePanel/>
            <TextBoxPanel selectedObject={props.selectedObject}/>
            <ShapePanel selectedObject={props.selectedObject}/>
            <PicturePanel/>
        </div>
    )
}

export {
    Panel,
}

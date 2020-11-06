import React from 'react';
import styles from './Panel.module.css';
import {PanelSection} from "./PanelSection";
import {Button} from "../controls/Button";
import AppIcon from "./res/icon.svg";
import ExportIcon from "./res/presentation/export.svg";
import ImportIcon from "./res/presentation/import.svg";
import UndoIcon from "./res/presentation/undo.svg";
import RedoIcon from "./res/presentation/redo.svg";
import AddTextBoxIcon from "./res/textboxes/addTextBox.svg";
import AddFigureIcon from "./res/shapes/addShape.svg";
import AddWebPictureIcon from "./res/pictures/addWebPic.svg";
import UploadPictureIcon from "./res/pictures/uploadPic.svg";

function Panel() {
    return (
        <div className={styles.panelBar}>
            <img style={{marginLeft: "25px"}} src={AppIcon} alt={"Oops!"}/>
            <PanelSection sectionName={"Presentation"}>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                    return;
                }} >
                    <img src={ExportIcon} alt={"Oops!"}/>
                </Button>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                        return;
                    }} >
                    <img src={ImportIcon} alt={"Oops!"}/>
                </Button>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                        return;
                    }} >
                    <img src={UndoIcon} alt={"Oops!"}/>
                </Button>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                        return;
                    }} >
                    <img src={RedoIcon} alt={"Oops!"}/>
                </Button>
            </PanelSection>
            <PanelSection sectionName={"TextBoxes"}>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                        return;
                    }} >
                    <img src={AddTextBoxIcon} alt={"Oops!"}/>
                </Button>
            </PanelSection>
            <PanelSection sectionName={"Shapes"}>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                        return;
                    }} >
                    <img src={AddFigureIcon} alt={"Oops!"}/>
                </Button>
            </PanelSection>
            <PanelSection sectionName={"Pictures"}>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                        return;
                    }} >
                    <img src={AddWebPictureIcon} alt={"Oops!"}/>
                </Button>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                        return;
                    }} >
                    <img src={UploadPictureIcon} alt={"Oops!"}/>
                </Button>
            </PanelSection>
        </div>
    )
}

export {
    Panel,
}

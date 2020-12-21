import React    from 'react';
import styles from './Panel.module.css';
import {PanelSection} from "./PanelSection";
import {Button} from "../controls/Button";
import AppIcon from "./res/icon.svg";
import ImportIcon from "./res/presentation/import.svg";
import ExportIcon from "./res/presentation/export.svg";
import ExportPdfIcon from "./res/presentation/exportpdf.svg";
import UndoIcon from "./res/presentation/undo.svg";
import RedoIcon from "./res/presentation/redo.svg";
import DeleteSlideIcon from "./res/slide/deleteSlide.svg";
import AddTextBoxIcon from "./res/textboxes/addTextBox.svg";
import AddFigureIcon from "./res/shapes/addShape.svg";
import UploadPictureIcon from "./res/pictures/uploadPic.svg";
import {dispatch, exportJSON, importJSON, redoAppState, undoAppState} from "../../controls/StateManager";
import {
    addObjectOnSelectedSlide,
    addPictureOnSlide,
    deleteSlide,
    setBackgroundPicture,
} from "../../model/SlidesMaker";
import {createTextBox, setTextBoxText} from "../../model/slide/slide_objects/textbox/TextBox";
import {createRect} from "../../model/types/Rect";
import {createParagraph, setParagraphAlignment} from "../../model/types/Paragraph";
import {Alignment} from "../../model/types/Alignment";
import {createFont, setFontFontColor} from "../../model/types/Font";
import {Colors} from "../../model/types/Colors";
import {createShape} from "../../model/slide/slide_objects/shape/Shape";
import {ShapeType} from "../../model/slide/slide_objects/shape/ShapeType";
import {createStyle} from "../../model/types/Style";
import {exportPDF} from "../../exportPDF";
import {addPictureFromLocalStorage} from "../../usecase/pictureUploader";
import {WebPictureUploader} from "./WebPictureUploader";
import {StrokeWidthInput} from "./StrokeWidthInput";
import {SwitchButton} from "./buttons/textboxes/SwitchButton";
import {FontSelector} from "./buttons/textboxes/FontSelector";

function Panel() {
    return (
        <div className={styles.panelBar}>
            <img style={{marginLeft: "25px"}} src={AppIcon} alt={"Oops!"}/>
            <PanelSection sectionName={"Presentation"}>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                        importJSON();
                    }} >
                    <img src={ImportIcon} alt={"Oops!"}/>
                </Button>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                        exportJSON();
                    }}
                >
                    <img src={ExportIcon} alt={"Oops!"}/>
                </Button>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                        exportPDF().then(() => {
                            //alert("Successful export!");
                            return;
                        }, () => {
                            throw new Error("oops! export not possible");
                        });
                    }}
                >
                    <img src={ExportPdfIcon} alt={"Oops!"}/>
                </Button>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                        undoAppState();
                    }} >
                    <img src={UndoIcon} alt={"Oops!"}/>
                </Button>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                        redoAppState();
                    }} >
                    <img src={RedoIcon} alt={"Oops!"}/>
                </Button>
            </PanelSection>
            <PanelSection sectionName={"Slide"}>
                <WebPictureUploader fnToPayloadPicture={setBackgroundPicture} value={"https://i.imgur.com/eob00g2.png"}/>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                       addPictureFromLocalStorage(setBackgroundPicture);
                    }} >
                    <img src={UploadPictureIcon} alt={"Oops!"}/>
                </Button>
                <Button
                    className={styles.panelDeleteSlideButton}
                    onClick={() => {
                        dispatch(deleteSlide, undefined);
                    }} >
                    <img  src={DeleteSlideIcon} alt={"Oops!"}/>
                </Button>
            </PanelSection>
            <PanelSection sectionName={"TextBoxes"}>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                        dispatch(addObjectOnSelectedSlide, setTextBoxText(createTextBox(
                            createRect(200, 200, 100, 70),
                            setParagraphAlignment(createParagraph(), Alignment.LEFT),
                            setFontFontColor(createFont("Arial", 20), Colors.BLACK)),
                            'Text'));
                    }} >
                    <img src={AddTextBoxIcon} alt={"Oops!"}/>
                </Button>
                <FontSelector></FontSelector>
                <SwitchButton switchType={"bold"}></SwitchButton>
                <SwitchButton switchType={"italic"}></SwitchButton>
                <SwitchButton switchType={"underlined"}></SwitchButton>
            </PanelSection>
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
                <StrokeWidthInput value={"0"}/>
            </PanelSection>
            <PanelSection sectionName={"Pictures"}>
                <WebPictureUploader fnToPayloadPicture={addPictureOnSlide} value={"https://i.imgur.com/eob00g2.png"}/>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                        addPictureFromLocalStorage(addPictureOnSlide);
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

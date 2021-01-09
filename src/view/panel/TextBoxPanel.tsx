import {Button} from "../controls/Button";
import styles from "./Panel.module.css";
import {dispatch} from "../../state/StateManager";
import {addObjectOnSelectedSlide, updateTextBox} from "../../model/SlidesMaker";
import {createTextBox, setTextBoxText} from "../../model/slide/slide_objects/textbox/TextBox";
import {createRect} from "../../model/types/Rect";
import {createParagraph, setParagraphAlignment} from "../../model/types/Paragraph";
import {Alignment} from "../../model/types/Alignment";
import {createFont, setFontFontColor} from "../../model/types/Font";
import {Colors} from "../../model/types/Colors";
import AddTextBoxIcon from "./res/textboxes/addTextBox.svg";
import {FontSelector} from "./buttons/textboxes/FontSelector";
import {ColorPicker} from "./buttons/ColorPicker";
import {AlignmentButtons} from "./buttons/textboxes/AlignmentButtons";
import {PanelSection} from "./PanelSection";
import React from "react";
import {SlideObjectType} from "../../model/slide/Slide";
import {EmphasisButtons} from "./buttons/textboxes/EmphasisButtons";
import {NumberSelector} from "./buttons/NumberSelector";

interface TextBoxPanelProps {
    selectedObject: SlideObjectType | null;
}

export function TextBoxPanel(props: TextBoxPanelProps) {
    const textBoxPanelIsDisabled = !(props.selectedObject && "text" in props.selectedObject.object);

    const fontSizeOptions: Array<number> = [];
    for (let i = 10; i < 41; i += 2)
    {
        fontSizeOptions.push(i)
    }
    for (let i = 50; i < 91; i += 20)
    {
        fontSizeOptions.push(i)
    }

    let defaultFontSize = 24;
    if (props.selectedObject && "font" in props.selectedObject.object)
    {
        defaultFontSize = props.selectedObject.object.font.fontSize;
    }

    let defaultFontColor = "#000000";
    if (props.selectedObject && "font" in props.selectedObject.object)
    {
        defaultFontColor = props.selectedObject.object.font.fontColor;
    }

    return (
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
            <div style={{display: textBoxPanelIsDisabled ? "none" : "inline-flex"}}>
                <FontSelector selectedObject={props.selectedObject}/>
                <NumberSelector
                    optionsData={fontSizeOptions}
                    defaultNum={defaultFontSize}
                    dispatchPickedOption={(pickedOption: string) => {
                        props.selectedObject && "font" in props.selectedObject.object &&
                        dispatch(updateTextBox, {objectId: props.selectedObject.id, newTextBox: {...props.selectedObject.object, font: {...props.selectedObject.object.font, fontSize: Number(pickedOption)}}})
                    }}
                />
                <EmphasisButtons selectedObject={props.selectedObject}/>
                <ColorPicker
                    selectedObject={props.selectedObject}
                    defaultColor={defaultFontColor}
                    dispatchPickedColor={(pickedColor: string) => {
                    props.selectedObject && "font" in props.selectedObject.object &&
                        dispatch(updateTextBox, {objectId: props.selectedObject.id, newTextBox: {...props.selectedObject.object, font: {...props.selectedObject.object.font, fontColor: pickedColor}}})
                    }}
                />
                <AlignmentButtons selectedObject={props.selectedObject}/>
            </div>
        </PanelSection>
    )
}
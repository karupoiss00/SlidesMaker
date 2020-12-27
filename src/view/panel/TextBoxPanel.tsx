import {Button} from "../controls/Button";
import styles from "./Panel.module.css";
import {dispatch} from "../../controls/StateManager";
import {addObjectOnSelectedSlide} from "../../model/SlidesMaker";
import {createTextBox, setTextBoxText} from "../../model/slide/slide_objects/textbox/TextBox";
import {createRect} from "../../model/types/Rect";
import {createParagraph, setParagraphAlignment} from "../../model/types/Paragraph";
import {Alignment} from "../../model/types/Alignment";
import {createFont, setFontFontColor} from "../../model/types/Font";
import {Colors} from "../../model/types/Colors";
import AddTextBoxIcon from "./res/textboxes/addTextBox.svg";
import {FontSelector} from "./buttons/textboxes/FontSelector";
import {SwitchButton} from "./buttons/textboxes/SwitchButton";
import BoldIcon from "./res/textboxes/boldIcon.svg";
import ItalicIcon from "./res/textboxes/italicIcon.svg";
import UnderlinedIcon from "./res/textboxes/underlinedIcon.svg";
import {ColorPicker} from "./buttons/ColorPicker";
import {AlignmentButtons} from "./buttons/textboxes/AlignmentButton";
import {PanelSection} from "./PanelSection";
import React from "react";
import {SlideObjectType} from "../../model/slide/Slide";

interface TextBoxPanelProps {
    selectedObject: SlideObjectType | null;
}

export function TextBoxPanel(props: TextBoxPanelProps) {
    let textBoxPanelIsDisabled: boolean = !(props.selectedObject && "text" in props.selectedObject.object);

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
            <div style={{display: textBoxPanelIsDisabled ? "none" : "flex"}}>
                <FontSelector/>
                <SwitchButton selectedObject={props.selectedObject} switchType={"bold"} icon={BoldIcon}/>
                <SwitchButton selectedObject={props.selectedObject} switchType={"italic"} icon={ItalicIcon}/>
                <SwitchButton selectedObject={props.selectedObject} switchType={"underlined"} icon={UnderlinedIcon}/>
                <ColorPicker selectedObject={props.selectedObject} isDisabled={textBoxPanelIsDisabled}/>
                <AlignmentButtons selectedObject={props.selectedObject} isDisabled={textBoxPanelIsDisabled}/>
            </div>
        </PanelSection>
    )
}
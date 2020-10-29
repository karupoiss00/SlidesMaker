import React from "react";
import styles from "./TextBoxView.module.css";
import {TextBox} from "../../model/slide/slide_objects/textbox/TextBox";
import {RectView} from "./RectView";
import {Id} from "../../model/slide/slide_objects/id/Id";
import {Rect} from "../../model/types/Rect";
import {Paragraph} from "../../model/types/Paragraph";
import {Font} from "../../model/types/Font";

interface TextBoxViewProps {
    textBox: TextBox;
    objectId: Id;
    isSelected: boolean;
    onClick: ((newId: Id) => any) | null;
}

function TextBoxView(props: TextBoxViewProps) {
    const textBox: TextBox = props.textBox;
    const rect: Rect = textBox.rect;
    const paragraph: Paragraph = textBox.paragraph;
    const font: Font = textBox.font;

    return (
        <RectView rect={rect} visibility={props.isSelected}>
            <textarea className={styles.textBoxInput}
                      style={{
                        fontWeight: font.isBold ? "bold" : "normal",
                        fontStyle: font.isItalic ? "italic" : "normal",
                        textDecoration: font.isUnderlined ? "underline" : "none",
                        fontFamily: font.fontName,
                        fontSize: font.fontSize.toString() + "px",
                        color: font.fontColor.toString(),
                        textAlign: paragraph.alignmentState
                      }}
                      defaultValue={props.textBox.text}
                      onClick={ (e) => {
                            e.stopPropagation();
                            props.onClick && props.objectId &&
                                props.onClick(props.objectId);
                        }
                      }
            />
        </RectView>
    )
}

export {
    TextBoxView
}
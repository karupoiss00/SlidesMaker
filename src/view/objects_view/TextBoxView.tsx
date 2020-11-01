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
    scale?: number;
    onClick: ((newId: Id) => any) | null;
}

function TextBoxView(props: TextBoxViewProps) {
    const textBox: TextBox = props.textBox;
    const rect: Rect = textBox.rect;
    const paragraph: Paragraph = textBox.paragraph;
    const font: Font = textBox.font;
    const scale: number = props.scale ? props.scale : 1;

    return (
        <RectView rect={rect} visibility={props.isSelected} scale={scale}>
            <textarea className={styles.textBoxInput}
                      style={{
                        fontWeight: font.isBold ? "bold" : "normal",
                        fontStyle: font.isItalic ? "italic" : "normal",
                        textDecoration: font.isUnderlined ? "underline" : "none",
                        fontFamily: font.fontName,
                        fontSize: (Math.floor(font.fontSize * scale)).toString() + "px",
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
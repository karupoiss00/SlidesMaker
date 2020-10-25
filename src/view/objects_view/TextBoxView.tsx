import React from "react";
import styles from "./TextBoxView.module.css";
import {TextBox} from "../../model/slide/slide_objects/textbox/TextBox";
import {RectView} from "./RectView";

interface TextBoxViewProps {
    textBox: TextBox;
}

function TextBoxView(props: TextBoxViewProps) {
    const textBox = props.textBox;
    const rect = textBox.rect;
    const font = textBox.font;
    const paragraph = textBox.paragraph;

    return (
        <RectView rect={rect}>
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
            />
        </RectView>
    )
}

export {
    TextBoxView
}
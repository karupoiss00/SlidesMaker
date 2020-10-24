import React, {ReactNode} from "react";
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
        <RectView rect={props.textBox.rect}>
            <textarea className={styles.textBoxInput} style={{
                fontWeight: font.isBold ? "bold" : "normal",
                fontStyle: font.isItalic ? "italic" : "normal",
                textDecoration: font.isUnderlined ? "underline" : "none",
                fontFamily: font.fontName,
                fontSize: font.fontSize.toString() + "px",
                color: font.fontColor.toString(),
                textAlign: paragraph.alignmentState
            }}>{props.textBox.text}
            </textarea>
        </RectView>
        /*
        * this._textArea.setStyle("font-weight", font.isBold() ? "bold" : "normal");
        this._textArea.setStyle("font-style", font.isItalic() ? "italic" : "normal");
        this._textArea.setStyle("text-decoration", font.isUnderline() ? "underline" : "none");
        this._textArea.setStyle("font-family", font.fontName());
        this._textArea.setStyle("font-size", font.fontSize().toString() + "px");
        this._textArea.setStyle("color", font.textColor());
        * this._textArea.setStyle("text-align", paragraph.alignmentState());*/
    )
}

export {
    TextBoxView
}
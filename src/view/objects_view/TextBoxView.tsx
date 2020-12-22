import React, {useRef} from "react";
import styles from "./TextBoxView.module.css";
import {TextBox} from "../../model/slide/slide_objects/textbox/TextBox";
import {RectView} from "./RectView";
import {Id} from "../../model/slide/slide_objects/id/Id";
import {Rect} from "../../model/types/Rect";
import {Paragraph} from "../../model/types/Paragraph";
import {Font} from "../../model/types/Font";
import {dispatch} from "../../controls/StateManager";
import {updateTextBox} from "../../model/SlidesMaker";

interface TextBoxViewProps {
    textBox: TextBox;
    objectId: Id;
    isSelected: boolean;
    scale?: number;
    onSelectionClick: ((newId: Id) => any) | null;
}

function TextBoxView(props: TextBoxViewProps) {
    const textBox: TextBox = props.textBox;
    const rect: Rect = textBox.rect;
    const paragraph: Paragraph = textBox.paragraph;
    const font: Font = textBox.font;
    let fontFamily: string = textBox.font.fontName;
    switch (textBox.font.fontName) {
        case "Arial" || "Arial Black" || "Times New Roman" || "Verdana" || "Tahoma" || "Trebuchet MS" || "Impact" || "Comic Sans MS":
            fontFamily += ", sans-serif";
            break;
        case "Courier New" || "Courier":
            fontFamily += ", monospace";
            break;
        case "Georgia" || "Palatino" || "Garamond" || "Bookman":
            fontFamily += ", serif";
            break;
    }
    const scale: number = props.scale ? props.scale : 1;
    const style: Record<string, string> = {
        fontWeight: font.isBold ? "bold" : "normal",
        fontStyle: font.isItalic ? "italic" : "normal",
        textDecoration: font.isUnderlined ? "underline" : "none",
        fontFamily: fontFamily,
        fontSize: (Math.floor(font.fontSize * scale)).toString() + "px",
        color: font.fontColor.toString(),
        textAlign: paragraph.alignmentState,
    }

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <RectView rect={rect} visibility={props.isSelected} scale={scale} objectId={props.objectId}>
            {scale === 1
                ?
                     <textarea className={styles.textBoxInput}
                               style={style}
                               onInput={() =>{
                                   if (textAreaRef.current)
                                   {
                                       textAreaRef.current.style.height = "auto";
                                       textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;

                                       const newText: string = textAreaRef.current.value;
                                       dispatch(updateTextBox, {
                                           objectId: props.objectId,
                                           newTextBox: {
                                               ...textBox,
                                               text: newText,
                                           },
                                       })
                                   }
                               }}
                               ref={textAreaRef}
                               defaultValue={props.textBox.text}
                               onClick={ (e) => {
                                       e.nativeEvent.preventDefault();
                                       console.log(e.defaultPrevented);
                                       props.onSelectionClick &&
                                            props.onSelectionClick(props.objectId);
                                    }
                               }
                     />
                :
                    <p className={styles.textBoxListView} style={style}>
                        {props.textBox.text}
                    </p>
            }
        </RectView>
    )
}

export {
    TextBoxView
}
import React, {useRef} from "react";
import styles from "./TextBoxView.module.css";
import {TextBox} from "../../model/slide/slide_objects/textbox/TextBox";
import {RectView} from "./RectView";
import {Id} from "../../model/slide/slide_objects/id/Id";
import {Rect} from "../../model/types/Rect";
import {Paragraph} from "../../model/types/Paragraph";
import {Font} from "../../model/types/Font";
import {dispatch} from "../../controls/StateManager";
import {updateTextBoxText} from "../../model/SlidesMaker";

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
    const scale: number = props.scale ? props.scale : 1;
    const style: Record<string, string> = {
        fontWeight: font.isBold ? "bold" : "normal",
        fontStyle: font.isItalic ? "italic" : "normal",
        textDecoration: font.isUnderlined ? "underline" : "none",
        fontFamily: font.fontName,
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
                               onChange={() =>{
                                   if (textAreaRef.current)
                                   {
                                       textAreaRef.current.style.height =  `${textAreaRef.current.scrollTop + textAreaRef.current.offsetHeight + 40}px`;
                                       const newText: string = textAreaRef.current.value;
                                       dispatch(updateTextBoxText, {
                                           objectId: props.objectId,
                                           newText: newText,
                                       })
                                   }
                               }}
                               ref={textAreaRef}
                               defaultValue={props.textBox.text}
                               onClick={ (e) => {
                                       e.nativeEvent.preventDefault();
                                       props.onSelectionClick &&
                                            props.onSelectionClick(props.objectId);
                                    }
                               }
                     />
                :
                    <p className={styles.textBoxListView}
                       style={style}
                       onClick={ (e) => {
                           if (scale === 1)
                           {
                               e.preventDefault();
                               props.onSelectionClick &&
                                    props.onSelectionClick(props.objectId);
                           }
                        }
                    }
                    >
                        {props.textBox.text}
                    </p>
            }
        </RectView>
    )
}

export {
    TextBoxView
}
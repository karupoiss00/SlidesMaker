import {SlideObjectType} from "../../../../model/slide/Slide";
import BoldIcon from "../../res/textboxes/boldIcon.svg";
import ItalicIcon from "../../res/textboxes/italicIcon.svg";
import UnderlinedIcon from "../../res/textboxes/underlinedIcon.svg";
import React from "react";
import {Font} from "../../../../model/types/Font";
import {dispatch} from "../../../../state/StateManager";
import {updateTextBox} from "../../../../model/SlidesMaker";
import styles from "../../Panel.module.css";

interface EmphasisButtonsProps {
    selectedObject: SlideObjectType | null;
}

export function EmphasisButtons(props: EmphasisButtonsProps) {
    let isBold = false;
    let isItalic = false;
    let isUnderlined = false;

    if (props.selectedObject && "text" in props.selectedObject.object)
    {
        isBold = props.selectedObject.object.font.isBold;
        isItalic = props.selectedObject.object.font.isItalic;
        isUnderlined = props.selectedObject.object.font.isUnderlined;
    }

    const boldButtonStyle = isBold ? styles.panelSquareButtonBoldAndItalicActive : styles.panelSquareButtonBoldAndItalic;
    const italicButtonStyle = isItalic ? styles.panelSquareButtonBoldAndItalicActive : styles.panelSquareButtonBoldAndItalic;
    const underlinedButtonStyle = isUnderlined ? styles.panelSquareButtonActive : styles.panelSquareButton;

    return (
        <div
            style={{display: "flex", height: "30px"}}
        >
            <button
                className={boldButtonStyle}
                onClick={() => {
                    if (props.selectedObject && props.selectedObject.id && "font" in props.selectedObject.object)
                    {
                        const newFont: Font = props.selectedObject.object.font;
                        newFont.isBold = !isBold;

                        dispatch(updateTextBox, {
                            objectId: props.selectedObject.id,
                            newTextBox: {
                                ...props.selectedObject.object,
                                font: newFont,
                            },
                        });
                    }
                }}>
                <img src={BoldIcon} alt={"Oops!"}/>
            </button>
            <button
                className={italicButtonStyle}
                onClick={() => {
                    if (props.selectedObject && props.selectedObject.id && "font" in props.selectedObject.object)
                    {
                        const newFont: Font = props.selectedObject.object.font;
                        newFont.isItalic = !isItalic;

                        dispatch(updateTextBox, {
                            objectId: props.selectedObject.id,
                            newTextBox: {
                                ...props.selectedObject.object,
                                font: newFont,
                            },
                        });
                    }
                }}>
                <img src={ItalicIcon} alt={"Oops!"}/>
            </button>
            <button
                className={underlinedButtonStyle}
                onClick={() => {
                    if (props.selectedObject && props.selectedObject.id && "font" in props.selectedObject.object)
                    {
                        const newFont: Font = props.selectedObject.object.font;
                        newFont.isUnderlined = !isUnderlined;

                        dispatch(updateTextBox, {
                            objectId: props.selectedObject.id,
                            newTextBox: {
                                ...props.selectedObject.object,
                                font: newFont,
                            },
                        });
                    }
                }}>
                <img src={UnderlinedIcon} alt={"Oops!"}/>
            </button>
        </div>
    )
}
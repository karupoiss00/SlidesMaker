import styles from "../../Panel.module.css";
import {SlideObjectType} from "../../../../model/slide/Slide";
import {getSelectedObject, updateTextBox} from "../../../../model/SlidesMaker";
import {dispatch, getAppState} from "../../../../controls/StateManager";
import BoldIcon from "../../res/textboxes/boldIcon.svg";
import ItalicIcon from "../../res/textboxes/italicIcon.svg";
import UnderlinedIcon from "../../res/textboxes/underlinedIcon.svg";
import React, {useEffect, useRef, useState} from "react";
import {Font} from "../../../../model/types/Font";

interface SwitchButtonProps {
    selectedObject: SlideObjectType | null;
    switchType: "bold" | "italic" | "underlined";
    icon: string;
}

export function SwitchButton(props: SwitchButtonProps) {
    let isSwitched = false;

    if (props.selectedObject && "text" in props.selectedObject.object)
    {
        switch (props.switchType) {
            case "bold":
                isSwitched = props.selectedObject.object.font.isBold;
                break;
            case "italic":
                isSwitched = props.selectedObject.object.font.isItalic;
                break;
            case "underlined":
                isSwitched = props.selectedObject.object.font.isUnderlined;
                break;
        }

    }

    const buttonStyle = isSwitched ? styles.panelSquareButton + styles.panelSquareButtonActive : styles.panelSquareButton

    return (
        <button
            className={buttonStyle}
            onClick={() => {
                if (props.selectedObject && props.selectedObject.id && "text" in props.selectedObject.object)
                {
                    const newFont: Font = props.selectedObject.object.font;

                    switch (props.switchType) {
                        case "bold":
                            newFont.isBold = !isSwitched;
                            break;
                        case "italic":
                            newFont.isItalic = !isSwitched;
                            break;
                        case "underlined":
                            newFont.isUnderlined= !isSwitched;
                            break;
                    }

                    dispatch(updateTextBox, {
                        objectId: props.selectedObject.id,
                        newTextBox: {
                            ...props.selectedObject.object,
                            font: newFont,
                        },
                    });
                }
            }} >
            <img src={props.icon} alt={"Oops!"}/>
        </button>
    )
}
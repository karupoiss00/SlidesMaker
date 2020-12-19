import styles from "../../Panel.module.css";
import {SlideObjectType} from "../../../../model/slide/Slide";
import {getSelectedObject, updateTextBox} from "../../../../model/SlidesMaker";
import {dispatch, getAppState} from "../../../../controls/StateManager";
import BoldIcon from "../../res/textboxes/boldIcon.svg";
import ItalicIcon from "../../res/textboxes/italicIcon.svg";
import UnderlinedIcon from "../../res/textboxes/underlinedIcon.svg";
import {Button} from "../../../controls/Button";
import React, {ReactSVG, useEffect, useRef, useState} from "react";
import {Font} from "../../../../model/types/Font";

interface SwitchButtonProps {
    switchType: "bold" | "italic" | "underlined";
}

export function SwitchButton(props: SwitchButtonProps) {
    const selectedObject: SlideObjectType | null = getSelectedObject(getAppState());
    let isSwitched: boolean = false;
    let icon: string = BoldIcon;

    switch (props.switchType) {
        case "bold":
            icon = BoldIcon;
            break;
        case "italic":
            icon = ItalicIcon;
            break;
        case "underlined":
            icon = UnderlinedIcon;
            break;
    }

    if (selectedObject && "text" in selectedObject.object)
    {
        switch (props.switchType) {
            case "bold":
                isSwitched = selectedObject.object.font.isBold;
                break;
            case "italic":
                isSwitched = selectedObject.object.font.isItalic;
                break;
            case "underlined":
                isSwitched = selectedObject.object.font.isUnderlined;
                break;
        }
    }

    const buttonRef = useRef<HTMLButtonElement>(null);
    const [buttonState, setButtonState] = useState(isSwitched);
    useEffect(() => {
        if (buttonRef && buttonRef.current) {
            if (buttonState)
            {
                buttonRef.current.style.background = "#4f4f4f";
            }
            else
            {
                buttonRef.current.style.background = "#2c2c2c";
            }
        }
    }, [buttonState, buttonRef]);

    return (
        <button
            className={styles.panelSquareButton}
            ref={buttonRef}
            onClick={() => {
                setButtonState(!buttonState);
                if (selectedObject && selectedObject.id && "text" in selectedObject.object)
                {
                    let newFont: Font = selectedObject.object.font;

                    switch (props.switchType) {
                        case "bold":
                            newFont.isBold = buttonState;
                            break;
                        case "italic":
                            newFont.isItalic = buttonState;
                            break;
                        case "underlined":
                            newFont.isUnderlined= buttonState;
                            break;
                    }

                    dispatch(updateTextBox, {
                        objectId: selectedObject.id,
                        newTextBox: {
                            ...selectedObject.object,
                            font: newFont,
                        },
                    });
                }
            }} >
            <img src={icon} alt={"Oops!"}/>
        </button>
    )
}
import {dispatch} from "../../../../controls/StateManager";
import {updateTextBox} from "../../../../model/SlidesMaker";
import styles from "../../Panel.module.css";
import LeftAlignmentIcon from "../../res/textboxes/leftAlignmentIcon.svg";
import CenterAlignmentIcon from "../../res/textboxes/centerAlignmentIcon.svg";
import RightAlignmentIcon from "../../res/textboxes/rightAlignmentIcon.svg";
import React from "react";
import {SlideObjectType} from "../../../../model/slide/Slide";
import {Alignment} from "../../../../model/types/Alignment";

interface AlignmentButtonsProps {
    selectedObject: SlideObjectType | null;
}

export function AlignmentButtons(props: AlignmentButtonsProps) {
    let buttonsState = {left: false, center: false, right: false};

    if (props.selectedObject && "text" in props.selectedObject.object)
    {
        switch (props.selectedObject.object.paragraph.alignmentState) {
            case Alignment.LEFT:
                buttonsState = {left: true, center: false, right: false};
                break;
            case Alignment.CENTER:
                buttonsState = {left: false, center: true, right: false};
                break;
            case Alignment.RIGHT:
                buttonsState = {left: false, center: false, right: true};
                break;
        }
    }

    const leftButtonStyle = buttonsState.left ? styles.panelSquareButtonActive : styles.panelSquareButton;
    const centerButtonStyle = buttonsState.center ? styles.panelSquareButtonActive : styles.panelSquareButton;
    const rightButtonStyle = buttonsState.right ? styles.panelSquareButtonActive : styles.panelSquareButton;

    return (
        <div
            style={{
                display: "inline-block",
            }}
        >
            <button
                className={leftButtonStyle}
                onClick={() => {
                    if (props.selectedObject && props.selectedObject.id && "paragraph" in props.selectedObject.object)
                    {
                        const newAlignment: Alignment = Alignment.LEFT;

                        dispatch(updateTextBox, {
                            objectId: props.selectedObject.id,
                            newTextBox: {
                                ...props.selectedObject.object,
                                paragraph: {
                                    alignmentState: newAlignment,
                                },
                            },
                        });
                    }
                }}
            >
                <img src={LeftAlignmentIcon} alt={"Oops!"}/>
            </button>
            <button
                className={centerButtonStyle}
                onClick={() => {
                    if (props.selectedObject && props.selectedObject.id && "paragraph" in props.selectedObject.object)
                    {
                        const newAlignment: Alignment = Alignment.CENTER;

                        dispatch(updateTextBox, {
                            objectId: props.selectedObject.id,
                            newTextBox: {
                                ...props.selectedObject.object,
                                paragraph: {
                                    alignmentState: newAlignment,
                                },
                            },
                        });
                    }
                }}
            >
                <img src={CenterAlignmentIcon} alt={"Oops!"}/>
            </button>
            <button
                className={rightButtonStyle}
                onClick={() => {
                    if (props.selectedObject && props.selectedObject.id && "paragraph" in props.selectedObject.object)
                    {
                        const newAlignment: Alignment = Alignment.RIGHT;

                        dispatch(updateTextBox, {
                            objectId: props.selectedObject.id,
                            newTextBox: {
                                ...props.selectedObject.object,
                                paragraph: {
                                    alignmentState: newAlignment,
                                },
                            },
                        });
                    }
                }}
            >
                <img src={RightAlignmentIcon} alt={"Oops!"}/>
            </button>
        </div>
    );
}
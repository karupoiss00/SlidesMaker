import {WebPictureUploader} from "./WebPictureUploader";
import {deleteSlide, setBackground, setBackgroundPicture} from "../../model/SlidesMaker";
import {Button} from "../controls/Button";
import styles from "./Panel.module.css";
import {addPictureFromLocalStorage} from "../../usecase/pictureUploader";
import UploadPictureIcon from "./res/slide/addSlideBackground.svg";
import {dispatch, getAppState} from "../../state/StateManager";
import DeleteSlideIcon from "./res/slide/deleteSlide.svg";
import {PanelSection} from "./PanelSection";
import React from "react";
import {ColorPicker} from "./buttons/ColorPicker";
import FillColorIcon from "./res/slide/fillColor.svg";
import {Colors} from "../../model/types/Colors";
import {Background} from "../../model/types/Background";

export function SlidePanel() {
    const appState = getAppState();
    const selectedSlide = appState.currentSlide ? appState.currentSlide : 0;
    let background: Background = getAppState().slideList[selectedSlide].slide.background;

    return (
        <PanelSection sectionName={"Slide"}>
            <div  style={{
                display: "flex",
                flexDirection: "row",
                marginRight: "30px",
                height: "30px"
            }}>
                <ColorPicker
                    defaultColor={
                        typeof(background) === "string" ? background : "#ffffff"
                    }
                    dispatchPickedColor={(color: string) => {
                        background = color as Colors;
                    }}
                />
                <Button className={styles.panelSquareButton}
                        onClick={
                            () => {
                                dispatch(setBackground, background as Colors)
                            }
                        }
                >
                    <img src={FillColorIcon} alt={"Oops!"}/>
                </Button>
            </div>
            <div  style={{
                display: "flex",
                flexDirection: "row",
                marginRight: "20px",
            }}>
                <WebPictureUploader fnToPayloadPicture={setBackgroundPicture} value={"https://i.imgur.com/eob00g2.png"}/>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                        addPictureFromLocalStorage(setBackgroundPicture);
                    }} >
                    <img src={UploadPictureIcon} alt={"Oops!"}/>
                </Button>
            </div>
            <Button
                className={styles.panelDeleteSlideButton}
                onClick={() => {
                    dispatch(deleteSlide, undefined);
                }} >
                <img  src={DeleteSlideIcon} alt={"Oops!"}/>
            </Button>
        </PanelSection>
    )
}
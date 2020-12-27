import {WebPictureUploader} from "./WebPictureUploader";
import {deleteSlide, setBackgroundPicture} from "../../model/SlidesMaker";
import {Button} from "../controls/Button";
import styles from "./Panel.module.css";
import {addPictureFromLocalStorage} from "../../usecase/pictureUploader";
import UploadPictureIcon from "./res/pictures/uploadPic.svg";
import {dispatch} from "../../controls/StateManager";
import DeleteSlideIcon from "./res/slide/deleteSlide.svg";
import {PanelSection} from "./PanelSection";
import React from "react";

export function SlidePanel() {
    return (
        <PanelSection sectionName={"Slide"}>
            <WebPictureUploader fnToPayloadPicture={setBackgroundPicture} value={"https://i.imgur.com/eob00g2.png"}/>
            <Button
                className={styles.panelSquareButton}
                onClick={() => {
                    addPictureFromLocalStorage(setBackgroundPicture);
                }} >
                <img src={UploadPictureIcon} alt={"Oops!"}/>
            </Button>
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
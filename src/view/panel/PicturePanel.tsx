import {WebPictureUploader} from "./WebPictureUploader";
import {addPictureOnSlide} from "../../model/SlidesMaker";
import {Button} from "../controls/Button";
import styles from "./Panel.module.css";
import {addPictureFromLocalStorage} from "../../usecase/pictureUploader";
import UploadPictureIcon from "./res/pictures/uploadPic.svg";
import {PanelSection} from "./PanelSection";
import React from "react";

export function PicturePanel() {
    return (
        <PanelSection sectionName={"Pictures"}>
            <WebPictureUploader fnToPayloadPicture={addPictureOnSlide} value={"https://i.imgur.com/eob00g2.png"}/>
            <Button
                className={styles.panelSquareButton}
                onClick={() => {
                    addPictureFromLocalStorage(addPictureOnSlide);
                }} >
                <img src={UploadPictureIcon} alt={"Oops!"}/>
            </Button>
        </PanelSection>
    )
}
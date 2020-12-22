import React from "react";
import {Picture} from "../../model/slide/slide_objects/picture/Picture";
import {Id} from "../../model/slide/slide_objects/id/Id";
import {Rect} from "../../model/types/Rect";
import {RectView} from "./RectView";
import styles from "./PictureView.module.css";

interface PictureViewProps {
    picture: Picture;
    objectId: Id;
    isSelected: boolean;
    scale?: number;
    onSelectionClick: ((newId: Id) => any) | null;
}

function PictureView(props: PictureViewProps) {
    const picture: Picture = props.picture;
    const rect: Rect = picture.rect;
    const src: string = picture.src;
    const scale: number = props.scale ? props.scale : 1;
    return (
        <RectView rect={rect}
                  visibility={props.isSelected}
                  scale={scale}
                  objectId={props.objectId}
                  onSelectionClick={props.onSelectionClick}
                  >
            <img src={src}
                 alt={"oops"}
                 width={rect.width * scale}
                 height={rect.height * scale}
                 className={styles.picture}
                 style={{
                     cursor: "inherit",
                 }}
                 draggable={"false"}
                 onClick={ (e) => {
                     if (scale === 1)
                     {
                         e.preventDefault();
                         props.onSelectionClick &&
                            props.onSelectionClick(props.objectId);
                     }
                 }}
            />
        </RectView>
    )
}

export {
    PictureView
}
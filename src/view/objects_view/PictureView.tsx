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
    onClick: ((newId: Id) => any) | null;
}

function PictureView(props: PictureViewProps) {
    const picture: Picture = props.picture;
    const rect: Rect = picture.rect;
    const src: string = picture.src;
    const scale: number = props.scale ? props.scale : 1;

    return (
        <RectView rect={rect} visibility={props.isSelected} scale={scale} objectId={props.objectId}>
            <img src={src}
                 alt={"oops"}
                 width={rect.width * scale}
                 height={rect.height * scale}
                 className={styles.picture}
                 draggable={"false"}
                 onClick={ (e) => {
                     if (scale === 1)
                     {
                         e.preventDefault();
                         props.onClick &&
                         props.onClick(props.objectId);
                     }
                 }}
            />
        </RectView>
    )
}

export {
    PictureView
}
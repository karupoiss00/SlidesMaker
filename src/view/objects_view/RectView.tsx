import React, {ReactNode, useState} from "react";
import styles from "./RectView.module.css";
import {Rect} from "../../model/types/Rect";
import {dispatch} from "../../StateManager";
import {moveObject} from "../../model/SlidesMaker";
import {Id} from "../../model/slide/slide_objects/id/Id";

interface RectViewProps {
    children?: ReactNode;
    rect: Rect;
    visibility: boolean;
    scale?: number;
    objectId: Id;
}

export function RectView(props: RectViewProps) {
    const scale: number = props.scale ? props.scale : 1;
    let startDragX = 0;
    let startDragY = 0;

    const [rectCoords, setRectCoords] = useState({x: props.rect.x, y: props.rect.y})

    return (
        <div className={styles.rect} style={{
            left: rectCoords.x * scale,
            top: rectCoords.y * scale,
            width: props.rect.width * scale,
            height: props.rect.height * scale,
            border: props.visibility ? "2px dashed #2C2C2C" : "none",
            cursor: scale === 1 && props.visibility ? "move" : "inherit",
        }}
            draggable={scale === 1 && props.visibility ? "true" : "false"}
            onDragStart={(e) => {
                startDragX = e.clientX;
                startDragY = e.clientY;
            }}
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDragEnd={(e) => {
                const newX = rectCoords.x - startDragX + e.clientX;
                const newY = rectCoords.y - startDragY + e.clientY;
                setRectCoords({
                    x: newX,
                    y: newY
                });
                dispatch(moveObject, {
                    objectId: props.objectId,
                    newRect: {
                        ...props.rect,
                        x: newX,
                        y: newY,
                    }},
                );
            }}
        >
            {props.visibility &&
                <div>
                    <div className={styles.rectDotLeftTop}/>
                    <div className={styles.rectDotLeftBottom}/>
                    <div className={styles.rectDotRightTop}/>
                    <div className={styles.rectDotRightBottom}/>
                </div>
            }
            { props.children }
        </div>
    );
}
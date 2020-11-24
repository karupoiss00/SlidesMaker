import React, {ReactNode, useRef, useState} from "react";
import styles from "./RectView.module.css";
import {Rect} from "../../model/types/Rect";
import {dispatch} from "../../StateManager";
import {moveObject} from "../../model/SlidesMaker";
import {Id} from "../../model/slide/slide_objects/id/Id";
import {useDragAndDrop} from "../usecase/useDragAndDrop";

interface RectViewProps {
    children?: ReactNode;
    rect: Rect;
    visibility: boolean;
    scale?: number;
    objectId: Id;
}

export function RectView(props: RectViewProps) {
    const scale: number = props.scale ? props.scale : 1;
    const [rectCoords, setRectCoords] = useState({x: props.rect.x * scale, y: props.rect.y * scale})
    const ref = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    useDragAndDrop(rectCoords, setRectCoords, ref, props.visibility, (newX: number, newY: number) => {
        dispatch(moveObject, {
            objectId: props.objectId,
            newRect: {
                ...props.rect,
                x: newX,
                y: newY,
            }},
        );
    });


    return (
        <div className={styles.rect} style={{
            left: rectCoords.x * scale,
            top: rectCoords.y * scale,
            width: props.rect.width * scale,
            height: props.rect.height * scale,
            border: props.visibility ? "2px dashed #2C2C2C" : "2px dashed rgba(255, 255, 255, 0)",
            cursor: scale === 1 && props.visibility ? "move" : "inherit",
        }}
            draggable={"false"}
            ref={ref}
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
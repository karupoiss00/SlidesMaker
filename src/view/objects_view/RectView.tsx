import React, {ReactNode, useRef, useState} from "react";
import {CornerView} from "./CornerView";
import styles from "./RectView.module.css";
import {Rect} from "../../model/types/Rect";
import {dispatch} from "../../controls/StateManager";
import {updateObjectRect} from "../../model/SlidesMaker";
import {Id} from "../../model/slide/slide_objects/id/Id";
import {useDragAndDrop} from "../../usecase/useDragAndDrop";

interface RectViewProps {
    children?: ReactNode;
    scale?: number;
    rect: Rect;
    visibility: boolean;
    objectId: Id;
    onSelectionClick: ((newId: Id) => any) | null;
}

export function RectView(props: RectViewProps) {
    const scale: number = props.scale ? props.scale : 1;
    const rectRef =  useRef<HTMLDivElement>(null);
    const [rectCoords, setRectCoords] = useState({x: props.rect.x * scale, y: props.rect.y * scale});

    React.useEffect(() => {
        setRectCoords({
            x: props.rect.x * scale,
            y: props.rect.y * scale,
        })
    }, [props.rect, scale]);

    useDragAndDrop({
        coords: rectCoords,
        setNewCoords: setRectCoords,
    }, {
        ref: rectRef,
        isSelected: props.visibility,
        needUpdate: true,
    }, (newX: number, newY: number) => {
        dispatch(updateObjectRect, {
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
            ref={rectRef}
            onClick={ (e) => {
                if (scale === 1)
                {
                    e.preventDefault();
                    props.onSelectionClick &&
                    props.onSelectionClick(props.objectId);
                }
            }}
        >
            {props.visibility &&
                <div>
                    <CornerView
                        rect={{
                            ...props.rect,
                            x: rectCoords.x,
                            y: rectCoords.y
                        }}
                        objectId={props.objectId}
                        type={"LeftTop"}
                        visibility={props.visibility}
                        parentRef={rectRef}
                    />
                    <CornerView
                        rect={{
                            ...props.rect,
                            x: rectCoords.x,
                            y: rectCoords.y
                        }}
                        objectId={props.objectId}
                        type={"LeftBottom"}
                        visibility={props.visibility}
                        parentRef={rectRef}
                    />
                    <CornerView
                        rect={{
                            ...props.rect,
                            x: rectCoords.x,
                            y: rectCoords.y
                        }}
                        objectId={props.objectId}
                        type={"RightTop"}
                        visibility={props.visibility}
                        parentRef={rectRef}
                    />
                    <CornerView
                        rect={{
                            ...props.rect,
                            x: rectCoords.x,
                            y: rectCoords.y
                        }}
                        objectId={props.objectId}
                        type={"RightBottom"}
                        visibility={props.visibility}
                        parentRef={rectRef}
                    />
                </div>
            }
            { props.children }
        </div>
    );
}
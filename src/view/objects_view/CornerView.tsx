import React, {MutableRefObject, useRef} from "react";
import {Rect} from "../../model/types/Rect";
import styles from "./RectView.module.css";
import {dispatch} from "../../StateManager";
import {updateObjectRect} from "../../model/SlidesMaker";
import {Id} from "../../model/slide/slide_objects/id/Id";
import {useResize} from "../../usecase/useResize";

export type CornerType = "LeftTop" | "LeftBottom" | "RightTop" | "RightBottom";

interface CornerViewProps {
    rect: Rect;
    objectId: Id;
    visibility: boolean;
    type: CornerType;
    parentRef: MutableRefObject<HTMLDivElement | null>;
}

export function CornerView(props: CornerViewProps) {
    const cornerRef = useRef<HTMLDivElement>(HTMLDivElement.prototype);
    let style;
    if (props.type === 'LeftTop')
    {
        style = styles.rectDotLeftTop;
    }
    else if (props.type === 'LeftBottom')
    {
        style = styles.rectDotLeftBottom;
    }
    else if (props.type === 'RightTop')
    {
        style = styles.rectDotRightTop;
    }
    else if (props.type === 'RightBottom')
    {
        style = styles.rectDotRightBottom;
    }
    useResize(
    {
            cornerRef: cornerRef,
            objectRef: props.parentRef,
            isSelected: props.visibility,
            cornerType: props.type
        },
        props.rect,
  (newRect: Rect) => {
            console.log(props.rect, "resized to", newRect)
            dispatch(updateObjectRect, {
                    objectId: props.objectId,
                    newRect: newRect,
                }
        );
    });

    return(
        <div className={style}
             ref={cornerRef}
        />
    );
}
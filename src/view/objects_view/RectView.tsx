import React, {ReactNode} from "react";
import styles from "./RectView.module.css";
import {Rect} from "../../model/types/Rect";

interface RectViewProps {
    children?: ReactNode;
    rect: Rect;
}

export function RectView(props: RectViewProps) {
    return (
        <div className={styles.rect} style={{
            left: props.rect.x,
            top: props.rect.y,
            width: props.rect.width,
            height: props.rect.height,
        }}>
            <div className={styles.rectDotLeftTop}></div>
            <div className={styles.rectDotLeftBottom}></div>
            <div className={styles.rectDotRightTop}></div>
            <div className={styles.rectDotRightBottom}></div>

            { props.children }
        </div>
    );
}
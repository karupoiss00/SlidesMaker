import React, {ReactNode} from "react";
import styles from "./RectView.module.css";
import {Rect} from "../../model/types/Rect";

interface RectViewProps {
    children?: ReactNode;
    rect: Rect;
    visibility: boolean;
}

export function RectView(props: RectViewProps) {
    return (
        <div className={styles.rect} style={{
            left: props.rect.x,
            top: props.rect.y,
            width: props.rect.width,
            height: props.rect.height,
            border: props.visibility ? "2px dashed #2C2C2C" : "none",
        }}>
            {props.visibility &&
                <>
                    <div className={styles.rectDotLeftTop}/>
                    <div className={styles.rectDotLeftBottom}/>
                    <div className={styles.rectDotRightTop}/>
                    <div className={styles.rectDotRightBottom}/>
                </>
            }


            { props.children }
        </div>
    );
}
import React, {ReactNode} from "react";
import styles from "./RectView.module.css";
import {Rect} from "../../model/types/Rect";

interface RectViewProps {
    children?: ReactNode;
    rect: Rect;
    visibility: boolean;
    scale?: number;
}

export function RectView(props: RectViewProps) {
    const scale: number = props.scale ? props.scale : 1;

    return (
        <div className={styles.rect} style={{
            left: props.rect.x * scale,
            top: props.rect.y * scale,
            width: props.rect.width * scale,
            height: props.rect.height * scale,
            border: props.visibility ? "2px dashed #2C2C2C" : "none",
        }}>
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
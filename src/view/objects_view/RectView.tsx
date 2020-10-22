import React from "react";
import styles from "./RectView.module.css";
import {Rect} from "../../model/types/Rect";

export function RectView(props: Rect) {
    return (
        <div className="rect" style={{width: props.width, height: props.height}}>
            <div className={styles.rectDotLeftTop}></div>
            <div className={styles.rectDotLeftBottom}></div>
            <div className={styles.rectDotRightTop}></div>
            <div className={styles.rectDotRightBottom}></div>
        </div>
    );
}
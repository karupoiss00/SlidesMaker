import React, {ReactNode, useState} from "react";
import {Button} from "../controls/Button";
import styles from "./Panel.module.css";

interface PanelSectionProps {
    children?: ReactNode | string;
    sectionName: string;
}

function PanelSection(props: PanelSectionProps) {
    const [sectionContentVisibility, setSectionContentVisibility] = useState(false);
    return (
        <div className={styles.panelSection}>
            <Button className={styles.panelButton}
                    children={props.sectionName}
                    onClick={
                        () => {
                            setSectionContentVisibility(!sectionContentVisibility);
                        }
                    }
            />
            <div className={styles.panelBlock} style={{display: sectionContentVisibility ? "flex" : "none"}}>
                {props.children}
            </div>
        </div>
    )
}

export  {PanelSection}
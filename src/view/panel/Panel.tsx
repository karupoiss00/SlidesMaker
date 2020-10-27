import React from 'react';
import styles from './Panel.module.css';
import {PanelSection} from "./PanelSection";
import {Button} from "../controls/Button";

import ExportIcon from "./res/presentation/export.svg";
import ImportIcon from "./res/presentation/import.svg";
import UndoIcon from "./res/presentation/undo.svg";
import RedoIcon from "./res/presentation/redo.svg";

function Panel() {
    return (
        <div className={styles.panelBar}>
            <PanelSection sectionName={"Presentation"}>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                    return;
                }} >
                    <img src={ExportIcon} />
                </Button>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                        return;
                    }} >
                    <img src={ImportIcon} />
                </Button>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                        return;
                    }} >
                    <img src={UndoIcon} />
                </Button>
                <Button
                    className={styles.panelSquareButton}
                    onClick={() => {
                        return;
                    }} >
                    <img src={RedoIcon} />
                </Button>
            </PanelSection>
            <PanelSection sectionName={"TextBoxes"}>
            </PanelSection>
            <PanelSection sectionName={"Shapes"}>
            </PanelSection>
            <PanelSection sectionName={"Pictures"}>
            </PanelSection>
        </div>
    )
}

export {
    Panel,
}

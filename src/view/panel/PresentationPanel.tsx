import {Button} from "../controls/Button";
import styles from "./Panel.module.css";
import {exportJSON, importJSON, redoAppState, undoAppState} from "../../state/StateManager";
import ImportIcon from "./res/presentation/import.svg";
import ExportIcon from "./res/presentation/export.svg";
import {exportPDF} from "../../exportPDF";
import ExportPdfIcon from "./res/presentation/exportpdf.svg";
import UndoIcon from "./res/presentation/undo.svg";
import RedoIcon from "./res/presentation/redo.svg";
import {PanelSection} from "./PanelSection";
import React from "react";

export function PresentationPanel() {
    return (
        <PanelSection sectionName={"Presentation"}>
            <Button
                className={styles.panelSquareButton}
                onClick={() => {
                    importJSON();
                }} >
                <img src={ImportIcon} alt={"Oops!"}/>
            </Button>
            <Button
                className={styles.panelSquareButton}
                onClick={() => {
                    exportJSON();
                }}
            >
                <img src={ExportIcon} alt={"Oops!"}/>
            </Button>
            <Button
                className={styles.panelSquareButton}
                onClick={() => {
                    exportPDF().then(() => {
                        //alert("Successful export!");
                        return;
                    }, () => {
                        throw new Error("oops! export not possible");
                    });
                }}
            >
                <img src={ExportPdfIcon} alt={"Oops!"}/>
            </Button>
            <Button
                className={styles.panelSquareButton}
                onClick={() => {
                    undoAppState();
                }} >
                <img src={UndoIcon} alt={"Oops!"}/>
            </Button>
            <Button
                className={styles.panelSquareButton}
                onClick={() => {
                    redoAppState();
                }} >
                <img src={RedoIcon} alt={"Oops!"}/>
            </Button>
        </PanelSection>
    )
}
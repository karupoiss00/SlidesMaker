import React, {ReactNode, useRef} from "react";
import {Button} from "../../controls/Button";
import styles from "../Panel.module.css";
import {dispatch} from "../../../state/StateManager";
import {addObjectOnSelectedSlide} from "../../../model/SlidesMaker";
import {createShape} from "../../../model/slide/slide_objects/shape/Shape";
import {ShapeType} from "../../../model/slide/slide_objects/shape/ShapeType";
import {createRect} from "../../../model/types/Rect";
import {createStyle} from "../../../model/types/Style";
import {Colors} from "../../../model/types/Colors";
import AddEllipse from "../res/shapes/addEllipse.svg";
import AddTriangle from "../res/shapes/addTriangle.svg";
import AddRectangle from "../res/shapes/addRectangle.svg";

interface ShapeSelectorProps {
    visibility: boolean;
    setVisibilityFn: (value: boolean) => void;
}

export function ShapeSelector(props: ShapeSelectorProps) {
    const ref = useRef<HTMLDivElement>(null);

    const IsInRect = (mouseX: number, mouseY: number) => {
        return ref.current
            && mouseX >= ref.current.getBoundingClientRect().x
            && mouseX <= ref.current.getBoundingClientRect().x + ref.current.getBoundingClientRect().width
            && mouseY >= ref.current.getBoundingClientRect().y
            && mouseY <= ref.current.getBoundingClientRect().y + ref.current.getBoundingClientRect().height
    }

    const onClickButton = (e: MouseEvent) => {
        if (props.visibility && !IsInRect(e.clientX, e.clientY)) {
            props.setVisibilityFn(false)
        }
        window.removeEventListener("mouseup", onClickButton);
    }
    window.addEventListener("mouseup", onClickButton);

    return (
        <div style={{
                display: "flex",
                position: "absolute",
                top: "55px",
                left: "81px",
                background: "#2c2c2c",
                height: "auto",
                width: "auto",
                paddingLeft: "3px",
                paddingRight: "3px",
                paddingTop: "3px",
                paddingBottom: "3px",
                visibility: props.visibility ? "visible" : "hidden",
            }}
            ref={ref}
        >
            <Button
                className={styles.panelSquareButton}
                onClick={() => {
                    dispatch(addObjectOnSelectedSlide, createShape(
                        ShapeType.ELLIPSE,
                        createRect(200, 200, 100, 100),
                        createStyle(Colors.BLACK, Colors.WHITE, 2)));
                }}>
                <img src={AddEllipse} alt={"Oops!"}/>
            </Button>
            <Button
                className={styles.panelSquareButton}
                onClick={() => {
                    dispatch(addObjectOnSelectedSlide, createShape(
                        ShapeType.TRIANGLE,
                        createRect(200, 200, 100, 100),
                        createStyle(Colors.BLACK, Colors.WHITE, 2)));
                }}>
                <img src={AddTriangle} alt={"Oops!"}/>
            </Button>
            <Button
                className={styles.panelSquareButton}
                onClick={() => {
                    dispatch(addObjectOnSelectedSlide, createShape(
                        ShapeType.RECTANGLE,
                        createRect(200, 200, 100, 100),
                        createStyle(Colors.BLACK, Colors.WHITE, 2)));
                }}>
                <img src={AddRectangle} alt={"Oops!"}/>
            </Button>
        </div>
    )
}
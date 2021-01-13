import React, {ReactNode} from "react";

interface ShapeSelectorProps {
    visibility: boolean;
    children?: ReactNode | string;
}

export function ShapeSelector(props: ShapeSelectorProps) {
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
        }}>

            {props.children}
        </div>
    )
}
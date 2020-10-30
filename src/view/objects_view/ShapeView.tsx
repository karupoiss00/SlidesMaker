import React from "react";
import {Shape} from "../../model/slide/slide_objects/shape/Shape";
import {Id} from "../../model/slide/slide_objects/id/Id";
import {Rect} from "../../model/types/Rect";
import {Style} from "../../model/types/Style";
import {ShapeType} from "../../model/slide/slide_objects/shape/ShapeType";
import {RectView} from "./RectView";

interface ShapeViewProps {
    shape: Shape;
    objectId: Id;
    isSelected: boolean;
    onClick: ((newId: Id) => any) | null;
}

function ShapeView(props: ShapeViewProps) {
    const shape: Shape = props.shape;
    const shapeType: ShapeType = shape.shapeType;
    const rect: Rect = shape.rect;
    const style: Style = shape.style;

    return (
        <RectView rect={rect} visibility={props.isSelected}>
            <svg viewBox={`0 0 ${rect.width} ${rect.height}`}
                 width="100%" height="100%"
                 xmlns="http://www.w3.org/2000/svg"
                 onClick={ (e) => {
                     e.stopPropagation();
                     props.onClick && props.objectId &&
                        props.onClick(props.objectId);
                 }}>

                {shapeType === 'rectangle' ? (<rect x={`${style.strokeWidth / 2}`} y={`${style.strokeWidth / 2}`} width={`${rect.width - style.strokeWidth}`} height={`${rect.height - style.strokeWidth}`} stroke={style.strokeColor} strokeWidth={style.strokeWidth} fill={style.backgroundColor} />) : null}
                {shapeType === 'triangle' ? (<polygon points={`${style.strokeWidth},${rect.height - style.strokeWidth / 2} ${rect.width / 2},${style.strokeWidth * 1.5} ${rect.width - style.strokeWidth},${rect.height - style.strokeWidth / 2}`} stroke={style.strokeColor} strokeWidth={style.strokeWidth} fill={style.backgroundColor} />) : null}
                {shapeType === 'ellipse' ? (<ellipse cx="50%" cy="50%" rx={`${(rect.width - style.strokeWidth) / 2}`} ry={`${(rect.height - style.strokeWidth)/ 2}`} stroke={style.strokeColor} strokeWidth={style.strokeWidth} fill={style.backgroundColor} />) : null}
            </svg>
        </RectView>
    )
}

export {
    ShapeView
}
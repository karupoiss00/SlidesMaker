import {Rect, setRectHeight, setRectWidth, setRectX, setRectY} from '../../../types/Rect';
import {setStyleBackgroundColor, setStyleStrokeColor, setStyleStrokeWidth, Style} from '../../../types/Style';
import {ShapeType} from './ShapeType';
import {Colors} from "../../../types/Colors";

export type Shape = {
    shapeType: ShapeType;
    rect: Rect;
    style: Style;
}

function createShape(shapeType: ShapeType, rect: Rect, style: Style): Shape {
    return {
        shapeType: shapeType,
        rect: rect,
        style: style,
    }
}

function setShapeShapeType(shape: Shape, shapeType: ShapeType): Shape {
    return {
        ...shape,
        shapeType: shapeType,
    }
}

function setShapeX(shape: Shape, x: number): Shape {
    const newRect: Rect = setRectX(shape.rect, x);

    return {
        ...shape,
        rect: newRect,
    }
}

function setShapeY(shape: Shape, y: number): Shape {
    const newRect: Rect = setRectY(shape.rect, y);

    return {
        ...shape,
        rect: newRect,
    }
}

function setShapeWidth(shape: Shape, width: number): Shape {
    const newRect: Rect = setRectWidth(shape.rect, width);

    return {
        ...shape,
        rect: newRect,
    }
}

function setShapeHeight(shape: Shape, height: number): Shape {
    const newRect: Rect = setRectHeight(shape.rect, height);

    return {
        ...shape,
        rect: newRect,
    }
}

function setShapeBackgroundColor(shape: Shape, color: Colors): Shape {
    const newStyle: Style = setStyleBackgroundColor(shape.style, color);

    return {
        ...shape,
        style: newStyle,
    }
}

function setShapeStrokeColor(shape: Shape, color: Colors): Shape {
    const newStyle: Style = setStyleStrokeColor(shape.style, color);

    return {
        ...shape,
        style: newStyle,
    }
}

function setShapeStrokeWidth(shape: Shape, width: number): Shape {
    const newStyle: Style = setStyleStrokeWidth(shape.style, width);

    return {
        ...shape,
        style: newStyle,
    }
}

export {createShape, setShapeShapeType, setShapeX, setShapeY, setShapeWidth, setShapeHeight, setShapeBackgroundColor, setShapeStrokeColor, setShapeStrokeWidth};
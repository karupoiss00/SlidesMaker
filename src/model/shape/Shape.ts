import {Rect} from "../Rect";
import {Style} from "../Style";
import {ShapeType} from "./ShapeType";

type Shape = {
    shapeType: ShapeType,
    rect: Rect,
    style: Style
}

export type {Shape};
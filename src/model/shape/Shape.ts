import {Rect} from "../Rect";
import {Style} from "../Style";

type ShapeType = {
    type: 'rectangle' | 'triangle' | 'ellipse'
}

type Shape = ShapeType & {
    rect: Rect,
    style: Style
}

export type {Shape};
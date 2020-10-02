import {Rect} from "../Rect";
import {Style} from "../Style";

type Shape = {
    shapeType: 'rectangle' | 'triangle' | 'ellipse',
    rect: Rect,
    style: Style
}

export type {Shape};
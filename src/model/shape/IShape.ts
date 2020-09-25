import {IEventDispatcher} from "../../base/observer/IEventDispatcher";
import {ShapeType} from "./ShapeType";
import {Rect} from "../Rect";
import {Style} from "../Style";

interface IShape {
    shapeType(): ShapeType;
    rect(): Rect;
    style(): Style;
    rectChangeEvent(): IEventDispatcher;
    styleChangeEvent(): IEventDispatcher;
}

export type {IShape}
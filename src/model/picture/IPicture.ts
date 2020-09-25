import {IEventDispatcher} from "../../base/observer/IEventDispatcher";
import {Rect} from "../Rect";

interface IPicture {
    rect(): Rect;
    src(): string;
    rectChangeEvent(): IEventDispatcher;
}

export type {IPicture}
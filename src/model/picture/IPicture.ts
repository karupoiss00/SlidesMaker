import {IEventDispatcher} from "../../base/observer/IEventDispatcher";
import {Rect} from "../Rect";

interface IPicture {
    rect(): Rect;
    src(): string;
    setSrc(src: string): void;
    rectChangeEvent(): IEventDispatcher;
    srcChangeEvent(): IEventDispatcher;
}

export type {IPicture}
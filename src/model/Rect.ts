import {BaseObject} from "../base/BaseObject";
import {IEventDispatcher} from "../base/observer/IEventDispatcher";

class Rect extends BaseObject {
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;
    private readonly _rectChangeEvent: IEventDispatcher;

    constructor() {
        super();
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this._rectChangeEvent = this._createEventDispatcher();
    }

    x(): number {
        return this._x;
    }

    y(): number {
        return this._y;
    }

    width(): number {
        return this._width;
    }

    height(): number {
        return this._height;
    }

    setX(x: number) {
        this._x = x;
        this._rectChangeEvent.dispatch();
    }

    setY(y: number) {
        this._y = y;
        this._rectChangeEvent.dispatch();
    }

    setWidth(width: number) {
        this._width = width;
        this._rectChangeEvent.dispatch();
    }

    setHeight(height: number) {
        this._height = height;
        this._rectChangeEvent.dispatch();
    }

    rectChangeEvent() {
        return this._rectChangeEvent;
    }

    clone(): Rect {
        const newRect = new Rect();

        newRect.setX(this._x);
        newRect.setY(this._y);
        newRect.setWidth(this._width);
        newRect.setHeight(this._height);

        return newRect;
    }

}

export {Rect}
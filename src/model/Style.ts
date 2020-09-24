import {BaseObject} from "../base/BaseObject";
import {IEventDispatcher} from "../base/observer/IEventDispatcher";

class Style extends BaseObject {
    private _backgroundColor: string;
    private _strokeColor: string;
    private _strokeWidth: number;
    private readonly _styleChangeEvent: IEventDispatcher;

    constructor() {
        super();
        this._backgroundColor = "#ffffff";
        this._strokeColor = "#000000";
        this._strokeWidth = 1;
        this._styleChangeEvent = this._createEventDispatcher();
    }

    backgroundColor(): string {
        return this._backgroundColor;
    }

    strokeColor(): string {
        return this._strokeColor;
    }

    strokeWidth(): number {
        return this._strokeWidth;
    }

    setBackgroundColor(color: string) {
        this._backgroundColor = color;
        this._styleChangeEvent.dispatch();
    }

    setStrokeColor(color: string) {
        this._strokeColor = color;
        this._styleChangeEvent.dispatch();
    }

    setStrokeWidth(width: number) {
        this._strokeWidth = width;
        this._styleChangeEvent.dispatch();
    }

    styleChangeEvent(): IEventDispatcher {
        return this._styleChangeEvent;
    }
}

export {Style}
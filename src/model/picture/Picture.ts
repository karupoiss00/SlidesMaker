import {BaseObject} from "../../base/BaseObject";
import {IEventDispatcher} from "../../base/observer/IEventDispatcher";
import {IPicture} from "./IPicture";
import {Rect} from "../Rect";

class Picture extends BaseObject implements IPicture {
    private _src: string;
    private _rect: Rect;
    private readonly _rectChangeEvent: IEventDispatcher;
    private readonly _srcChangeEvent: IEventDispatcher;

    constructor() {
        super();
        this._src = "";
        this._rect = new Rect();
        this._rectChangeEvent = this._createEventDispatcher();
        this._srcChangeEvent = this._createEventDispatcher();

        this._addHandler(this._rect.rectChangeEvent(), () => {
            this._rectChangeEvent.dispatch();
        }, this);

    }

    src(): string {
        return this._src;
    }

    rect(): Rect {
        return this._rect;
    }

    setSrc(src: string) {
        this._src = src;
        this._srcChangeEvent.dispatch();
    }

    rectChangeEvent() {
        return this._rectChangeEvent;
    }

    srcChangeEvent() {
        return this._srcChangeEvent;
    }

}

export {Picture}
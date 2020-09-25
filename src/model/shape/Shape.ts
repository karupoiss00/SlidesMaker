import {BaseObject} from "../../base/BaseObject";
import {IEventDispatcher} from "../../base/observer/IEventDispatcher";
import {IShape} from "./IShape";
import {Rect} from "../Rect";
import {Style} from "../Style";
import {ShapeType} from "./ShapeType";

class Shape extends BaseObject implements IShape {
    private _shapeType: ShapeType;
    private _rect: Rect;
    private _style: Style;
    private readonly _rectChangeEvent: IEventDispatcher;
    private readonly _styleChangeEvent: IEventDispatcher;

    constructor() {
        super();
        this._shapeType = ShapeType.RECTANGLE;
        this._rect = new Rect();
        this._style = new Style();
        this._rectChangeEvent = this._createEventDispatcher();
        this._styleChangeEvent = this._createEventDispatcher();

        this._addHandler(this._rect.rectChangeEvent(), () => {
            this._rectChangeEvent.dispatch();
        }, this);

        this._addHandler(this._style.styleChangeEvent(), () => {
            this._styleChangeEvent.dispatch();
        }, this);
    }

    shapeType(): ShapeType {
        return this._shapeType;
    }

    rect(): Rect {
        return this._rect;
    }

    style(): Style {
        return this._style;
    }

    rectChangeEvent() {
        return this._rectChangeEvent;
    }

    styleChangeEvent() {
        return this._styleChangeEvent;
    }

}

export {Shape}
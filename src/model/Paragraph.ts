import {BaseObject} from "../base/BaseObject";
import {IEventDispatcher} from "../base/observer/IEventDispatcher";
import {Alignment} from "./Alignment";

class Paragraph extends BaseObject {
    _alignmentState: Alignment
    private readonly _paragraphChangeEvent: IEventDispatcher

    constructor() {
        super();
        this._alignmentState = right;  //<<<
        this._paragraphChangeEvent = this._createEventDispatcher();
    }

    alignmentState(): Alignment {
        return this._alignmentState;
    }

    setAlignmentState(state: Alignment) {
        this._alignmentState = state;
        this._paragraphChangeEvent.dispatch();
    }

}
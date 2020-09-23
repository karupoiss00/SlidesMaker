import {IActionSink} from "./IActionSink.js";
import {IHistory} from "./IHistory.js";
import {History} from "./History.js";
import {IAction} from "../action/IAction";

class ActionSink implements IActionSink {
    private _history: History | IHistory;

    constructor(history?: IHistory) {
        this._history = history || new History();
    }

    addAction(action: IAction) {
        this._history.addAction(action);
    }
}

export {ActionSink};
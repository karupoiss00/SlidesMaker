import {IHistory} from "./IHistory";
import {IAction} from "../action/IAction";
import {Asserts} from "../utils/Asserts.js";
import {IEventDispatcher} from "../observer/IEventDispatcher";
import {BaseObject} from "../BaseObject";
import {EventDispatcher} from "../observer/EventDispatcher";

class History extends BaseObject implements IHistory {
    private _actions: Array<IAction>;
    private _nextActionIndex: number;
    private _actionEvent: EventDispatcher;

    constructor() {
        super();

        this._actions = [];
        this._nextActionIndex = 0;
        this._actionEvent = this._createEventDispatcher();
    }

    addAction(action: IAction) {
        this._deleteActionsFromIndex(this._nextActionIndex);
        this._actions.push(action);

        ++this._nextActionIndex;

        action.execute();
        this._actionEvent.dispatch();
    }

    undo() {
        if (this.canUndo())
        {
            --this._nextActionIndex;
            this._actions[this._nextActionIndex].unexecute();

            this._actionEvent.dispatch();
        }
    }

    redo() {
        if (this.canRedo())
        {
            this._actions[this._nextActionIndex].execute();
            ++this._nextActionIndex;

            this._actionEvent.dispatch();
        }
    }

    canUndo() {
        return this._nextActionIndex > 0;
    }

    canRedo() {
        return this._nextActionIndex < this._actions.length;
    }

    actionEvent() {
        return this._actionEvent;
    }

    private _deleteActionsFromIndex(index: number) {
        Asserts.assert<boolean>(index >= 0);
        Asserts.assert<boolean>(index <= this._actions.length);

        const deletedActionsCount = this._actions.length - index;
        const deletedActions = this._actions.splice(index, deletedActionsCount);

        deletedActions.forEach((action) => action.dispose());
    }
}

export {History};
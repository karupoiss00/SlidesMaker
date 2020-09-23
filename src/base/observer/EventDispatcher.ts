import {IEventDispatcher} from "./IEventDispatcher";

class EventDispatcher implements IEventDispatcher {
    private _owner: Object | null;
    private _onEventInit: (() => any) | null | undefined;
    private _handlers: Array<{handler: () => any, context: Object | undefined}>;


    constructor({owner = null, onEventInit = null}:
                    {owner: Object | undefined | null, onEventInit: (() => any) | null | undefined}) {
        this._owner = owner;
        this._onEventInit = onEventInit;
        this._handlers = [];
    }

    addHandler(handler: () => any, context: Object): void {
        this._handlers.push({handler, context});
        this._onEventInit && this._onEventInitImpl();
    }

    removeHandler(handler: () => any, context: Object): void {
        this._handlers.some((value, index, array) => {
            if (value.handler === handler && value.context === context)
            {
                array.splice(index, 1);
                return true;
            }

            return false;
        });
    }

    dispatch(...args: any[]): void {
        this._handlers.forEach(({handler, context}) => {
            handler.apply<any, this>(args);
        });
    }

    owner(): Object | null {
        return this._owner;
    }

    private _onEventInitImpl() {
        if (this._onEventInit) this._onEventInit();
        this._onEventInit = null;
    }
}

export {EventDispatcher}
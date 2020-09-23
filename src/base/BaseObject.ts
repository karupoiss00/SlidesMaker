import {IEventDispatcher} from "./observer/IEventDispatcher";
import {EventDispatcher} from "./observer/EventDispatcher";

class BaseObject {
    private _activeHandlers: Array<{
        dispatcher: IEventDispatcher,
        handler: (() => any),
        context: Object
    }>;

    private _activeListeners: Array<{
        element: Element | HTMLDocument,
        type: string,
        listener: (() => any)
    }>;

    constructor() {
        this._activeHandlers = [];
        this._activeListeners = [];
    }

    protected _createEventDispatcher(): EventDispatcher {
        return new EventDispatcher({
            owner: this,
            onEventInit: null
        });
    }

    protected _addHandler(dispatcher: IEventDispatcher, handler: (() => any), context: Object) {
        dispatcher.addHandler(handler, context);
        this._activeHandlers.push({dispatcher, handler, context});
    }

    protected _removeHandler(dispatcher: IEventDispatcher, handler: (() => any), context: Object) {
        const activeHandlerIndex = this._activeHandlers.findIndex(
            (element) => (element.dispatcher == dispatcher) && (element.handler == handler) && (element.context == context)
        );

        if (activeHandlerIndex != -1)
        {
            this._activeHandlers.splice(activeHandlerIndex, 1);
            dispatcher.removeHandler(handler, context);
        }
    }

    protected _removeObjectHandlers(object: Object) {
        const activeHandlers = this._activeHandlers.filter(
            (element) => element.dispatcher.owner() == object
        );

        activeHandlers.forEach(
            ({dispatcher, handler, context}) => this._removeHandler(dispatcher, handler, context)
        );
    }

    protected _listen(element: Element | HTMLDocument, type: string, listener: () => any) {
        element.addEventListener(type, listener);
        this._activeListeners.push({element, type, listener});
    }

    protected _unlisten(element: Element | HTMLDocument, type: string, listener: () => any) {
        const activeListenerIndex = this._activeListeners.findIndex(
            (value) => (value.element == element) && (value.type == type) && (value.listener == listener)
        );

        if (activeListenerIndex != -1)
        {
            this._activeListeners.splice(activeListenerIndex, 1);
            element.removeEventListener(type, listener);
        }
    }

    protected _unlistenByType(element: Element | HTMLDocument, type: string) {
        const activeListeners = this._activeListeners.filter(
            (value) =>  (value.element == element) && (value.type == type)
        );

        activeListeners.forEach(
            ({element, type, listener}) => this._unlisten(element, type, listener)
        );
    }
}

export {BaseObject}
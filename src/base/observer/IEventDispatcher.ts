interface IEventDispatcher {
    addHandler(handler: () => any, context: Object): void;
    removeHandler(handler: () => any, context: Object): void;
    dispatch(...args: []): void;
    owner(): Object | null;
}

export type {IEventDispatcher};
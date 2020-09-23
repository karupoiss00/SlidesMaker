interface IAction {
    execute(): void;
    unexecute(): void;
    dispose(): void;
}

export type {IAction};
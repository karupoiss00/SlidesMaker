import {IAction} from "../action/IAction";
import {IEventDispatcher} from "../observer/IEventDispatcher";

interface IHistory {
    addAction(action: IAction): void;
    undo(): void;
    redo(): void;
    canUndo(): boolean;
    canRedo(): boolean;
    actionEvent(): IEventDispatcher;
}

export type {IHistory};
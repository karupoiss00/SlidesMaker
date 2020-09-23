import {IAction} from "../action/IAction";

interface IActionSink {
    addAction(action: IAction): void;
}
export type {IActionSink};
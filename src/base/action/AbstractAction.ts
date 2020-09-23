import {IAction} from "./IAction";

abstract class AbstractAction implements IAction {
    private _executed: boolean = false;

    execute() {
        if (!this._executed)
        {
            this.doExecute();
            this._executed = true;
        }
    }

    unexecute() {
        if (this._executed)
        {
            this.doUnexecute();
            this._executed = false;
        }
    }

    dispose() {

    }

    protected abstract doExecute(): void;
    protected abstract doUnexecute(): void;

    /**
     * @final
     */
     protected isExecuted() {
        return this._executed;
    }
}

export {AbstractAction};
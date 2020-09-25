import {BaseObject} from "../base/BaseObject";
import {IEventDispatcher} from "../base/observer/IEventDispatcher";

class Font extends BaseObject {
    private _fontName: string;
    private _fontSize: number;
    private _isBold: boolean;
    private _isItalic: boolean;
    private _isUnderlined: boolean;
    private readonly _fontChangeEvent: IEventDispatcher;

    constructor() {
        super();
        this._fontName = "";
        this._fontSize = 0;
        this._isBold = false;
        this._isItalic = false;
        this._isUnderlined = false;
        this._fontChangeEvent = this._createEventDispatcher();
    }

    fontSize(): number {
        return this._fontSize;
    }

    fontName(): string {
        return this._fontName;
    }

    isBold(): boolean {
        return this._isBold;
    }

    isItalic(): boolean {
        return this._isItalic;
    }

    isUnderlined(): boolean {
        return this._isUnderlined;
    }

    setFontSize(fontSize: number) {
        this._fontSize = fontSize;
        this._fontChangeEvent.dispatch();
    }

    setFontName(fontName: string) {
        this._fontName = fontName;
        this._fontChangeEvent.dispatch();
    }

    setBold(state: boolean) {
        this._isBold = state;
        this._fontChangeEvent.dispatch();
    }

    setUnderlined(state: boolean) {
        this._isUnderlined = state;
        this._fontChangeEvent.dispatch();
    }

    setItalic(state: boolean) {
        this._isItalic = state;
        this._fontChangeEvent.dispatch();
    }

}

export {Font}
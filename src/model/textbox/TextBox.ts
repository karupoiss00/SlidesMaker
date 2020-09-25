import {BaseObject} from "../../base/BaseObject";
import {IEventDispatcher} from "../../base/observer/IEventDispatcher";
import {ITextBox} from "./ITextBox";
import {Font} from "../Font";
import {Rect} from "../Rect";
import {Paragraph} from "../Paragraph";

class TextBox extends BaseObject implements ITextBox {
    private _text: string;
    private _rect: Rect;
    private _paragraph: Paragraph;
    private _font: Font;
    private _textChangeEvent: IEventDispatcher;
    private _rectChangeEvent: IEventDispatcher;
    private _paragraphChangeEvent: IEventDispatcher;
    private _fontChangeEvent: IEventDispatcher;

    constructor() {
        super();

        this._text = "";
        this._rect = new Rect();
        this._paragraph = new Paragraph();
        this._font = new Font();

        this._textChangeEvent = this._createEventDispatcher();
        this._rectChangeEvent = this._createEventDispatcher();
        this._paragraphChangeEvent = this._createEventDispatcher();
        this._fontChangeEvent = this._createEventDispatcher();

        this._addHandler(this._rect.rectChangeEvent(), () => {
            this._rectChangeEvent.dispatch();
        }, this);

        this._addHandler(this._paragraph.paragraphChangeEvent(), () => {
            this._paragraphChangeEvent.dispatch();
        }, this);

        this._addHandler(this._font.fontChangeEvent(), () => {
            this._fontChangeEvent.dispatch();
        }, this);

    }

    text(): string {
        return this._text;
    }

    font(): Font {
        return this._font;
    }

    rect(): Rect {
        return this._rect;
    }

    paragraph(): Paragraph {
        return this._paragraph;
    }

    textChangeEvent(): IEventDispatcher {
        return this._textChangeEvent;
    }

    fontChangeEvent(): IEventDispatcher {
        return this._fontChangeEvent;
    }

    rectChangeEvent(): IEventDispatcher {
        return this._rectChangeEvent;
    }

    paragraphChangeEvent(): IEventDispatcher {
        return this._paragraphChangeEvent;
    }

    setText(text: string) {
        this._text = text
        this._textChangeEvent.dispatch();
    }
}

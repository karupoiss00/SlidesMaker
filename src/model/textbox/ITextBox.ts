import {IEventDispatcher} from "../../base/observer/IEventDispatcher";
import {Font} from "../Font";
import {Rect} from "../Rect";
import {Paragraph} from "../Paragraph";

interface ITextBox {
    text(): string;
    font(): Font;
    rect(): Rect;
    paragraph(): Paragraph;
    textChangeEvent(): IEventDispatcher;
    fontChangeEvent(): IEventDispatcher;
    rectChangeEvent(): IEventDispatcher;
    paragraphChangeEvent(): IEventDispatcher;
    setText(text: string): void;
}

export type {ITextBox}
import {Font} from "../Font";
import {Rect} from "../Rect";
import {Paragraph} from "../Paragraph";

type TextBox = {
    text: string,
    rect: Rect,
    paragraph: Paragraph,
    font: Font
}

export type {TextBox};
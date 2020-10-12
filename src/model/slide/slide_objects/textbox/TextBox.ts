import {createFont, Font} from '../../../types/Font';
import {createRect, Rect} from '../../../types/Rect';
import {createParagraph, Paragraph} from '../../../types/Paragraph';

export type TextBox = {
    text: string;
    rect: Rect;
    paragraph: Paragraph;
    font: Font;
};

function createTextBox(): TextBox {
    return {
        text: '',
        rect: createRect(),
        paragraph: createParagraph(),
        font: createFont(),
    };
}

export { createTextBox };
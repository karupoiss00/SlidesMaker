import {createFont, Font} from '../../../types/font/Font';
import {createRect, Rect} from '../../../types/rect/Rect';
import {createParagraph, Paragraph} from '../../../types/paragraph/Paragraph';

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
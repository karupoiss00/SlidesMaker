import {createRect} from "../../../types/rect/Rect";
import {createParagraph} from "../../../types/paragraph/Paragraph";
import {createFont} from "../../../types/font/Font";
import {createTextBox} from "./TextBox";

describe('TextBox.ts', () => {
    test('TextBox: createTextBox', () => {
        expect({
            text: '',
            rect: createRect(),
            paragraph: createParagraph(),
            font: createFont(),
        }).toStrictEqual(createTextBox());
    });
});
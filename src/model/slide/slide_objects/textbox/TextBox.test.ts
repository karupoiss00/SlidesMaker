import {createRect} from "../../../types/Rect";
import {createParagraph} from "../../../types/Paragraph";
import {createFont} from "../../../types/Font";
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
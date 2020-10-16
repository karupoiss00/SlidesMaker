import {createRect} from "../../../types/rect/Rect";
import {createParagraph} from "../../../types/paragraph/Paragraph";
import {createFont} from "../../../types/font/Font";
import {createTextBox, TextBox} from "./TextBox";

describe('TextBox.ts', () => {
    test('TextBox: createTextBox', () => {
        let testTextBox: TextBox = {
            text: '',
            rect: createRect(),
            paragraph: createParagraph(),
            font: createFont(),
        }
        expect(testTextBox).toStrictEqual(createTextBox());
    });
});
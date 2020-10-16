import {createRect} from "../../../types/Rect";
import {createParagraph} from "../../../types/Paragraph";
import {createFont} from "../../../types/Font";
import {createTextBox, TextBox} from "./TextBox";

describe('TextBox.ts', () => {
    test('TextBox: createTextBox', () => {
        const testTextBox: TextBox = {
            text: '',
            rect: createRect(),
            paragraph: createParagraph(),
            font: createFont(),
        }
        expect(testTextBox).toStrictEqual(createTextBox());
    });
});
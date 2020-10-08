import {createRect} from "../../../types/Rect";
import {createParagraph} from "../../../types/Paragraph";
import {createFont} from "../../../types/Font";
import {createTextBox} from "./TextBox";

test('TextBox: создание окна с текстом', () => {
    expect({
        text: '',
        rect: createRect(),
        paragraph: createParagraph(),
        font: createFont(),
    }).toStrictEqual(createTextBox());
});
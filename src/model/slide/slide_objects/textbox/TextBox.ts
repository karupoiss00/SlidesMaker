import {Font, setFontFontName, setFontFontSize} from '../../../types/Font';
import {Rect, setRectHeight, setRectWidth, setRectX, setRectY} from '../../../types/Rect';
import {Paragraph, setParagraphAlignment} from '../../../types/Paragraph';
import {Alignment} from "../../../types/Alignment";

export type TextBox = {
    text: string;
    rect: Rect;
    paragraph: Paragraph;
    font: Font;
}

function createTextBox(rect: Rect, paragraph: Paragraph, font: Font): TextBox {
    return {
        text: '',
        rect: rect,
        paragraph: paragraph,
        font: font,
    }
}

function setTextBoxText(textBox: TextBox, text: string): TextBox{
    return {
        ...textBox,
        text: text,
    }
}

function setTextBoxX(textBox: TextBox, x: number): TextBox {
    const newRect: Rect = setRectX(textBox.rect, x);

    return {
        ...textBox,
        rect: newRect,
    }
}

function setTextBoxY(textBox: TextBox, y: number): TextBox {
    const newRect: Rect = setRectY(textBox.rect, y);

    return {
        ...textBox,
        rect: newRect,
    }
}

function setTextBoxWidth(textBox: TextBox, width: number): TextBox {
    const newRect: Rect = setRectWidth(textBox.rect, width);

    return {
        ...textBox,
        rect: newRect,
    }
}

function setTextBoxHeight(textBox: TextBox, height: number): TextBox {
    const newRect: Rect = setRectHeight(textBox.rect, height);

    return {
        ...textBox,
        rect: newRect,
    }
}

function setTextBoxAlignment(textBox: TextBox, state: Alignment): TextBox {
    const newParagraph: Paragraph = setParagraphAlignment(textBox.paragraph, state);

    return {
        ...textBox,
        paragraph: newParagraph,
    }
}

function setTextBoxFontName(textBox: TextBox, fontName: string): TextBox {
    const newFont: Font = setFontFontName(textBox.font, fontName);

    return {
        ...textBox,
        font: newFont,
    }
}

function setTextBoxFontSize(textBox: TextBox, fontSize: number): TextBox {
    const newFont: Font = setFontFontSize(textBox.font, fontSize);

    return {
        ...textBox,
        font: newFont,
    }
}

function switchTextBoxBold(textBox: TextBox): TextBox {
    const newFont: Font = switchTextBoxBold(textBox.font);

    return {
        ...textBox,
        font: newFont,
    }
}

function switchTextBoxItalic(textBox: TextBox): TextBox {
    const newFont: Font = switchTextBoxItalic(textBox.font);

    return {
        ...textBox,
        font: newFont,
    }
}

function switchTextBoxUnderline(textBox: TextBox): TextBox {
    const newFont: Font = switchTextBoxUnderline(textBox.font);

    return {
        ...textBox,
        font: newFont,
    }
}

export {createTextBox};
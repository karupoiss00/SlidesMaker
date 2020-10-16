import {createFont, Font} from "./Font";

test(`Font: createFont`,() => {
    const font: Font = {
        fontName: '',
        fontSize: 0,
        isBold: false,
        isItalic: false,
        isUnderlined: false,
    };
    expect(font).toStrictEqual(createFont());
});
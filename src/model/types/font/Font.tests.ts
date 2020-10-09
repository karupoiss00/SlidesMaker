import {createFont} from "./Font";

describe("Font.ts", () => {
    test('Font.ts: createFont', () => {
        expect({
            fontName: '',
            fontSize: 0,
            isBold: false,
            isItalic: false,
            isUnderlined: false,
        }).toStrictEqual(createFont());
    });
})

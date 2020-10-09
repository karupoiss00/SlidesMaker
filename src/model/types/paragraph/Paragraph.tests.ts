import {Alignment} from "../Alignment";
import {createParagraph} from "./Paragraph";

describe("Paragraph.ts", () => {
    test('Paragraph.ts: createParagraph', () => {
        expect({
            alignmentState: Alignment.LEFT,
        }).toStrictEqual(createParagraph());
    });
})
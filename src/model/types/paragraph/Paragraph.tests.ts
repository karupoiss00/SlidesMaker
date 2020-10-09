import {Alignment} from "../Alignment";
import {createParagraph} from "./Paragraph";

describe('импорт Alignment', () => {
    it('должен понимать Alignment.LEFT', () => {
        expect(Alignment.LEFT).toEqual('left');
    });
    it('должен понимать Alignment.CENTER', () => {
        expect(Alignment.CENTER).toEqual('center');
    });
    it('должен понимать Alignment.RIGHT', () => {
        expect(Alignment.RIGHT).toEqual('right');
    });
})

describe("Paragraph.ts", () => {
    test('Paragraph.ts: createParagraph', () => {
        expect({
            alignmentState: Alignment.LEFT,
        }).toStrictEqual(createParagraph());
    });
})

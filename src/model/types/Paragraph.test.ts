import {createParagraph, Paragraph} from "./Paragraph";
import {Alignment} from "./Alignment";

test(`Paragraph: createParagraph`,() => {
    const paragraph: Paragraph = {
        alignmentState: Alignment.LEFT,
    };
    expect(paragraph).toStrictEqual(createParagraph());
});
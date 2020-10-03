import {Alignment} from "./Alignment";

export type Paragraph = {
    alignmentState: Alignment
}

function createParagraph(): Paragraph {
    return {
        alignmentState: 'left',
    };
}

export {createParagraph}
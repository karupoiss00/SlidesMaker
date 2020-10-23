import { Alignment } from './Alignment';

export type Paragraph = {
    alignmentState: Alignment;
}

function createParagraph(): Paragraph {
    return {
        alignmentState: Alignment.LEFT,
    }
}

function setParagraphAlignment(paragraph: Paragraph, state: Alignment): Paragraph {
    return {
        alignmentState: state,
    }
}

export {createParagraph, setParagraphAlignment};
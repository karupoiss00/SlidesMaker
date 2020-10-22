import { SlidesMaker } from './SlidesMaker';

const undoStack: Array<SlidesMaker> = [];
const redoStack: Array<SlidesMaker> = [];

function undo(currentState: SlidesMaker): SlidesMaker | undefined {
    const slidesState: SlidesMaker | undefined = undoStack.pop();
    if (slidesState) {
        redoStack.push({...currentState});
    }
    return slidesState;
}

function redo(): SlidesMaker | undefined {
    return redoStack.pop();
}

function addToHistory(slidesState: SlidesMaker) {
    undoStack.push({...slidesState});
    while(redoStack.length) {
        redoStack.pop();
    }
}

export {addToHistory, undo, redo};
import {SlidesMaker} from './SlidesMaker';

const undoStack: Array<SlidesMaker> = [];
let redoStack: Array<SlidesMaker> = [];

function addToHistory(slidesState: SlidesMaker) {
    undoStack.push({...slidesState});
    redoStack = [];
}

function undo(currentState: SlidesMaker): SlidesMaker | undefined {
    const slidesState: SlidesMaker | undefined = undoStack.pop();

    if (slidesState) {
        redoStack.push({...currentState});
    }

    return slidesState;
}

function redo(): SlidesMaker | undefined {
    const slidesState: SlidesMaker | undefined = redoStack.pop();
    if(slidesState)
    {
        addToHistory(slidesState);
    }
    return slidesState;
}

export {addToHistory, undo, redo};
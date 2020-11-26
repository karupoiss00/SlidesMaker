import {SlidesMaker} from './SlidesMaker';

const undoStack: Array<SlidesMaker> = [];
const redoStack: Array<SlidesMaker> = [];

function addToHistory(slidesState: SlidesMaker) {
    undoStack.push({...slidesState});
}

function undo(currentState: SlidesMaker): SlidesMaker | undefined {
    const slidesState: SlidesMaker | undefined = undoStack.pop();

    redoStack.push({...currentState})

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

function clearHistory() {
    undoStack.length = 0;
    redoStack.length = 0;
}

export {addToHistory, undo, redo, clearHistory};
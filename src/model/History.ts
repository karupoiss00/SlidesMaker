import { SlidesMaker } from './SlidesMaker';

const undoStack: Array<SlidesMaker> = [];
const redoStack: Array<SlidesMaker> = [];

function undo(): SlidesMaker | undefined {
	const slidesState: SlidesMaker | undefined = undoStack.pop();
	if (slidesState) {
		redoStack.push(slidesState);
	}
	return slidesState;
}

function redo(): SlidesMaker | undefined {
	return redoStack.pop();
}

function addToHistory(slidesState: SlidesMaker) {
	undoStack.push(slidesState);
}

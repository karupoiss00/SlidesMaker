import {SlidesMaker} from "./SlidesMaker";

function importSlideMaker(stringifiedJsonFile: string): SlidesMaker {
    return JSON.parse(stringifiedJsonFile);
}

function exportSlideMaker(appState: SlidesMaker): string {
    return JSON.stringify(appState);
}

export {importSlideMaker, exportSlideMaker}
import React from "react";
import ReactDOM from "react-dom";
import {addToHistory, undo, redo} from "./model/History";
import App from "./App";
import './index.css';
import {createSlidesMaker, deepClone, SlidesMaker} from "./model/SlidesMaker";

let appState: SlidesMaker;

function render(state: SlidesMaker) {
    ReactDOM.render(
        <React.StrictMode>
            <App
                appModel={state}
            />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

function undoAppState() {
    const newAppState: SlidesMaker | undefined = undo(deepClone(appState) as SlidesMaker);
    if (newAppState) {
        appState = newAppState;
    }
    console.log('new undo', appState);
    render(appState);
}

function redoAppState() {
    const newAppState: SlidesMaker | undefined = redo();
    if (newAppState) {
        appState = newAppState;
    }
    console.log('new redo', appState);
    render(appState);
}

function start(state?: SlidesMaker) {
    if (state)
    {
        appState = state;
    }
    else
    {
        appState = createSlidesMaker();
    }

    render(appState);

    window.addEventListener('keydown', (e) => {
        if ((e.key === 'z' || e.key === 'я') && (e.metaKey || e.ctrlKey)) {
            undoAppState();
        }
        if ((e.key === 'y' || e.key === 'н') && (e.metaKey || e.ctrlKey)) {
            redoAppState();
        }
    });
}

function dispatch<T>(fn: (app: SlidesMaker, param: T) => SlidesMaker, arg: T) {
    addToHistory(appState);
    appState = fn(appState, arg);
    render(appState);
    console.log(appState);
}

function convertToObject<T>(source: T): { [k: string]: any } {
    const results: { [k: string]: any } = {};
    for (const P in source) {
        if (typeof source[P] === 'object') {
            results[P] = convertToObject(source[P]);
        } else {
            results[P] = source[P];
        }
    }
    return results;
}

function exportJSON(): void {
    console.log(convertToObject(appState));
    const json = JSON.stringify(convertToObject(appState));
    const a = document.createElement('a');
    const blob = new Blob([json], {type: 'octet/stream'});
    const url = window.URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = 'YourPresentation.json';
    a.click();
    window.URL.revokeObjectURL(url);
}

export {
    start,
    dispatch,
    undoAppState,
    redoAppState,
    exportJSON
}
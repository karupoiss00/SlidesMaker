import React from "react";
import ReactDOM from "react-dom";
import {addToHistory, undo, redo, clearHistory} from "./model/History";
import App from "./App";
import './index.css';
import {createSlidesMaker, deepClone, removeSelectedObject, SlidesMaker} from "./model/SlidesMaker";

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
    render(appState);
}

function redoAppState() {
    const newAppState: SlidesMaker | undefined = redo();
    if (newAppState) {
        appState = newAppState;
    }
    render(appState);
}

function dispatch<T>(fn: (app: SlidesMaker, param: T) => SlidesMaker, arg: T) {
    addToHistory(appState);
    appState = fn(appState, arg);
    render(appState);
}

function start(state?: SlidesMaker) {
    clearHistory();

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
        if (e.key === "Delete" && appState.selectedObjectId) {
            dispatch(removeSelectedObject, undefined);
        }
    });
}

function exportJSON(): void {
    const json = JSON.stringify(deepClone(appState));
    const a = document.createElement('a');
    const blob = new Blob([json], {type: 'octet/stream'});
    const url = window.URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = 'YourPresentation.json';
    a.click();
}

function importJSON(): void {
    const input = document.createElement('input');
    input.style.display = 'none';
    input.type = 'file';
    input.onchange = () => {
        if (input.files) {
            const file = input.files[0];
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                if (typeof reader.result === 'string')
                    start(JSON.parse(reader.result));
            };
        }
    };
    document.body.appendChild(input);
    input.click();
}

export {
    start,
    dispatch,
    undoAppState,
    redoAppState,
    exportJSON,
    importJSON
}
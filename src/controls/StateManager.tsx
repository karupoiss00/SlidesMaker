import React from "react";
import App from "../App";
import '../index.css';
import ReactDOM from "react-dom";
import {addToHistory, undo, redo, clearHistory} from "../model/History";
import {createSlidesMaker, deepClone, getSelectedObject, removeSelectedObject, SlidesMaker} from "../model/SlidesMaker";
import {addToClipboard, pasteFromClipboard} from "./Clipboard";

type Size = {
    width: number;
    height: number;
}

type AppConfig = {
    slideSize: Size;
}

type AppState = {
    state: SlidesMaker;
    config: AppConfig;
    isWaiting: boolean;
}

const app: AppState = {
    state: createSlidesMaker(),
    config: {
        slideSize: {
            width: 0,
            height: 0,
        }
    },
    isWaiting: false
}

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
    const newAppState: SlidesMaker | undefined = undo(deepClone(app.state) as SlidesMaker);
    if (newAppState) {
        app.state = newAppState;
    }
    render(app.state);
}

function redoAppState() {
    const newAppState: SlidesMaker | undefined = redo();
    if (newAppState) {
        app.state = newAppState;
    }
    console.log(newAppState);
    render(app.state);
}

function dispatch<T>(fn: (app: SlidesMaker, param: T) => SlidesMaker, arg: T) {
    addToHistory(app.state);
    app.state = fn(app.state, arg);
    render(app.state);
}

function start(newState?: SlidesMaker) {
    clearHistory();

    if (newState)
    {
        app.state = newState;
    }
    else
    {
        app.state = createSlidesMaker();
    }

    render(app.state);

    window.addEventListener('keydown', (e) => {
        if ((e.key === 'z' || e.key === 'я') && (e.metaKey || e.ctrlKey)) {
            undoAppState();
        }
        if ((e.key === 'y' || e.key === 'н') && (e.metaKey || e.ctrlKey)) {
            redoAppState();
        }
        if (e.key === "Delete" && app.state.selectedObjectId) {
            dispatch(removeSelectedObject, undefined);
        }
        if ((e.key === 'c' || e.key === 'с')  && (e.metaKey || e.ctrlKey))
        {
            addToClipboard(getSelectedObject(app.state));
        }
        if ((e.key === 'v' || e.key === 'м')  && (e.metaKey || e.ctrlKey))
        {
            pasteFromClipboard(getSelectedObject(app.state));
        }
    });
}

function exportJSON(): void {
    const json = JSON.stringify(deepClone(app.state));
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
                    start(deepClone(JSON.parse(reader.result)) as SlidesMaker);
            };
        }
    };
    document.body.appendChild(input);
    input.click();
}

function getAppState(): SlidesMaker {
    return deepClone(app.state) as SlidesMaker;
}

function getConfig(): AppConfig {
    return app.config;
}

function updateSlideSize(newSize: Size) {
    app.config.slideSize = newSize;
}

export {
    start,
    dispatch,
    undoAppState,
    redoAppState,
    exportJSON,
    importJSON,
    getAppState,
    getConfig,
    updateSlideSize,
}
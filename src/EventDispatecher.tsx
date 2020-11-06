import React from "react";
import ReactDOM from "react-dom";
import {addToHistory, undo, redo} from "./model/History";
import App from "./App";
import './index.css';
import {createSlidesMaker, SlidesMaker} from "./model/SlidesMaker";

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

function start() {
    appState = createSlidesMaker();
    render(appState);
}

function dispatch(fn: (app: SlidesMaker, param?: any) => SlidesMaker, arg?: any) {
    addToHistory(appState);

    if (arg !== undefined) {
        appState = fn(appState, arg);
    }
    else
    {
        appState = fn(appState);
    }

    render(appState);
}

export {
    start,
    dispatch
}
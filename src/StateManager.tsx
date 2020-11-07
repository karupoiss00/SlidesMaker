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

function dispatch<T>(fn: (app: SlidesMaker, param: T) => SlidesMaker, arg: T) {
    addToHistory(appState);
    appState = fn(appState, arg);
    render(appState);
}

export {
    start,
    dispatch
}
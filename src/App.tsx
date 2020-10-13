import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SlidesMaker} from "./model/SlidesMaker";
import {SlidesMakerView} from "./view/SlidesMakerView";

interface AppProps {
    appModel: SlidesMaker;
}

function App(props: AppProps) {
    return (
        <SlidesMakerView slidesMaker={props.appModel}
            panelClassName="panel"
            panelBlockClassName="panel-block"
            slideViewClassName="slide-view"
            slideListClassName="slide-list"/>
     );
}

export default App;

import React, {useState} from 'react';
import './App.css';
import {SlidesMaker} from "./model/SlidesMaker";
import {Panel} from "./view/panel/Panel";
import {SlideView} from "./view/slide/SlideView";
import {SlideListView} from "./view/slidelist/SlideListView";

interface AppProps {
    appModel: SlidesMaker;
    panelClassName: string;
    panelBlockClassName: string;
    slideViewClassName: string;
    slideListClassName: string;
}

function App(props: AppProps) {
    const [appState, setAppState] = useState(props.appModel);

    return (
        <div className="view">
            <Panel className={props.panelClassName} panelBlockClassName={props.panelBlockClassName}></Panel>
            {
                appState.currentSlide !== null &&
                <SlideView
                    className={props.slideViewClassName}
                    slide={appState.slideList[appState.currentSlide]}
                ></SlideView>

            }
            <SlideListView
                className={props.slideListClassName}
                slidesMaker={appState}
                onChange={setAppState}
            />
        </div>
    )
}

export default App;

import React, {useState} from 'react';
import styles from "./App.module.css";
import {SlidesMaker} from "./model/SlidesMaker";
import {Panel} from "./view/panel/Panel";
import {SlideView} from "./view/slide/SlideView";
import {SlideListView} from "./view/slidelist/SlideListView";

interface AppProps {
    appModel: SlidesMaker;
}

function App(props: AppProps) {
    const [appState, setAppState] = useState(props.appModel);

    return (
        <div className={styles.view}>
            <Panel></Panel>
            {
                appState.currentSlide !== null &&
                <SlideView
                    className={styles.slideView}
                    slide={appState.slideList[appState.currentSlide].slide}
                ></SlideView>

            }
            <SlideListView
                slidesMaker={appState}
                onChange={setAppState}
            />
        </div>
    )
}

export default App;

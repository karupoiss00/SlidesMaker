import React, {useState} from 'react';
import styles from "./App.module.css";
import {addSlide, setSelectedObject, setSelectedSlide, SlidesMaker} from "./model/SlidesMaker";
import {Panel} from "./view/panel/Panel";
import {SlideView} from "./view/slide/SlideView";
import {SlideListView} from "./view/slidelist/SlideListView";
import {Id} from "./model/slide/slide_objects/id/Id";

interface AppProps {
    appModel: SlidesMaker;
}

function App(props: AppProps) {
    const [appState, setAppState] = useState(props.appModel);

    const updateSelectedObject = (newSelectedId: Id | null) => {
        setAppState(setSelectedObject(appState, newSelectedId));
    }

    const addNewSlide = () => {
        setAppState(addSlide(appState));
    }

    const updateSelectedSlide = (newSelectedSlideNumber: number) => {
        setAppState(setSelectedSlide(appState, newSelectedSlideNumber));
    }

    return (
        <div className={styles.view}>
            <Panel/>
            {
                appState.currentSlide !== null &&
                <SlideView
                    className={styles.slideView}
                    slide={appState.slideList[appState.currentSlide].slide}
                    selectedObject={appState.selectedObjectId}
                    update={updateSelectedObject}
                />
            }
            <SlideListView
                slideList={appState.slideList}
                currentSlide={appState.currentSlide}
                onAddSlide={addNewSlide}
                onChangeSelectedSlide={updateSelectedSlide}
            />
        </div>
    )
}

export default App;

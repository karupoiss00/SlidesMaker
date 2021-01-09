import React from 'react';
import styles from "./App.module.css";
import {addSlide, getSelectedObject, setSelectedObject, setSelectedSlide, SlidesMaker} from "./model/SlidesMaker";
import {Panel} from "./view/panel/Panel";
import {SlideView} from "./view/slide/SlideView";
import {SlideListView} from "./view/slidelist/SlideListView";
import {Id} from "./model/slide/slide_objects/id/Id";
import {dispatch, getAppState, updateSlideSize} from "./state/StateManager";

interface AppProps {
    appModel: SlidesMaker;
}

function App(props: AppProps) {
    const updateSelectedObject = (newSelectedId: Id | null) => {
        dispatch(setSelectedObject, newSelectedId);
    }
    const addNewSlide = () => {
        dispatch(addSlide, undefined);
    }

    const updateSelectedSlide = (newSelectedSlideNumber: number) => {
        dispatch(setSelectedSlide, newSelectedSlideNumber);
    }
    return (
        <div className={styles.view}>
            <Panel
                selectedObject={getSelectedObject(getAppState())}
            />
            {
                props.appModel.currentSlide !== null &&
                <SlideView
                    className={styles.slideView}
                    slide={props.appModel.slideList[props.appModel.currentSlide].slide}
                    selectedObjectId={props.appModel.selectedObjectId}
                    update={updateSelectedObject}
                    onResize={updateSlideSize}
                />
            }
            <SlideListView
                slideList={props.appModel.slideList}
                currentSlide={props.appModel.currentSlide}
                onAddSlide={addNewSlide}
                onChangeSelectedSlide={updateSelectedSlide}
            />
        </div>
    )
}

export default App;

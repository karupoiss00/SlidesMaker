import React, { useState } from 'react'
import {Panel} from "./panel/Panel";
import {SlideView} from "./slide/SlideView";
import {SlideListView} from "./slidelist/SlideListView";
import {SlidesMaker} from "../model/SlidesMaker";

interface SlidesMakerViewProps {
    slidesMaker: SlidesMaker;
    panelClassName: string;
    panelBlockClassName: string;
    slideViewClassName: string;
    slideListClassName: string;
}


function SlidesMakerView(props: SlidesMakerViewProps) {
    const [appState, setAppState] = useState(props.slidesMaker);

    return (
        <div className="view">
            <Panel className={props.panelClassName} panelBlockClassName={props.panelBlockClassName}></Panel>
            {
                appState.currentSlide !== null &&
                    <SlideView
                        className={props.slideViewClassName}
                        slidesMaker={appState}
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

export {
    SlidesMakerView,
}

import React from 'react'
import {Panel} from "./panel/Panel";
import {SlideView} from "./slide/SlideView";
import {SlideListView} from "./slidelist/SlideListView";
import {SlidesMaker} from "../model/SlidesMaker";
import {Slide} from "../model/slide/Slide";

interface SlidesMakerViewProps {
    slidesMaker: SlidesMaker;
    panelClassName: string;
    panelBlockClassName: string;
    slideViewClassName: string;
    slideListClassName: string;
}


function SlidesMakerView(props: SlidesMakerViewProps) {
    return (
        <div className="view">
            <Panel className={props.panelClassName} panelBlockClassName={props.panelBlockClassName}></Panel>
            {
                props.slidesMaker.currentSlide != null &&
                    <SlideView className={props.slideViewClassName} slide={props.slidesMaker.slideList[props.slidesMaker.currentSlide]} key={props.slidesMaker.currentSlide}></SlideView>
            }
            <SlideListView className={props.slideListClassName} slideList={props.slidesMaker.slideList}></SlideListView>
        </div>
    )
}

export {
    SlidesMakerView,
}

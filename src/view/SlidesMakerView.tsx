import React from 'react'
import {Panel} from "./panel/Panel";
import {SlideView} from "./slide/SlideView";
import {SlideListView} from "./slidelist/SlideListView";
import {SlidesMaker} from "../model/SlidesMaker";

function SlidesMakerView(slidesMaker: SlidesMaker) {
    return (
        <div className="view">
            <Panel></Panel>
            {
                slidesMaker.currentSlide != null &&
                    <SlideView className="slide-view" slide={slidesMaker.slideList[slidesMaker.currentSlide]}></SlideView>
            }
            <SlideListView className="slide-list-view" slideList={slidesMaker.slideList}></SlideListView>
        </div>
    )
}

export {
    SlidesMakerView,
}

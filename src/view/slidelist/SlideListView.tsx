import React from 'react'
import {Slide} from "../../model/slide/Slide";
import {SlideView} from "../slide/SlideView";
import {SlidesMaker} from "../../model/SlidesMaker";

interface SlideViewProps {
    className: string;
    slidesMaker: SlidesMaker;
    slideList: Array<Slide>;
    currentSlide: number | null;
}

function SlideListView(props: SlideViewProps) {
    const listItems = props.slideList.map((value) => {
        const slideNumber = props.slideList.findIndex(value1 => value1 == value);
        let cssStyleName: string;
        const isSelectedSlide: boolean = slideNumber === props.currentSlide;

        isSelectedSlide
         ? cssStyleName = "slide-view-icon-selected"
         : cssStyleName = "slide-view-icon";

        return (<div className="slide-view-icon-container" key={slideNumber}>
            <SlideView
                className={cssStyleName}
                slidesMaker={props.slidesMaker}
                slide={value}
                key={slideNumber}
            />
            {
                isSelectedSlide &&
                    <div id="selected-slide-marker"> </div>
            }

        </div>)

    });
    return (
        <div className="slide-list-container">
            <div className={props.className}>
                {listItems}
            </div>
        </div>
    )
}

export {
    SlideListView,
}

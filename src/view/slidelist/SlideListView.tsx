import React from 'react'
import {Slide} from "../../model/slide/Slide";
import {SlideView} from "../slide/SlideView";
import {SlidesMaker} from "../../model/SlidesMaker";
import {SlidesMakerView} from "../SlidesMakerView";
import ReactDOM from "react-dom";
import App from "../../App";

interface SlideViewProps {
    className: string;
    slidesMaker: SlidesMaker;
    slideList: Array<Slide>;
    currentSlide: number | null;
}

function changeSlide(slidesMaker: SlidesMaker, slideNumber: number | null) {
    const newSlidesMaker = {...slidesMaker};
    newSlidesMaker.currentSlide = slideNumber;

    return ReactDOM.render(
        <React.StrictMode>
            <App appModel={newSlidesMaker} />
        </React.StrictMode>,
        document.getElementById('root')
    );

}

function SlideListView(props: SlideViewProps) {
    const listItems = props.slideList.map((value) => {
        const slideNumber = props.slideList.findIndex(value1 => value1 == value);
        let cssStyleName: string;
        const isSelectedSlide: boolean = slideNumber === props.currentSlide;

        isSelectedSlide
         ? cssStyleName = "slide-view-icon-selected"
         : cssStyleName = "slide-view-icon";

        return (<div className="slide-view-icon-container" key={slideNumber} onClick={() => {changeSlide(props.slidesMaker, slideNumber)}}>
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

import React, {MutableRefObject, useRef} from "react";
import ReactDOM from "react-dom";
import {Slide} from "../../model/slide/Slide";
import {SlideView} from "../slide/SlideView";
import {SlidesMaker, addSlide, setSelectedSlide} from "../../model/SlidesMaker";
import App from "../../App";
import {Button} from "../controls/Button";

interface SlideViewProps {
    className: string;
    slidesMaker: SlidesMaker;
    slideList: Array<Slide>;
    currentSlide: number | null;
}

function changeSlide(slidesMaker: SlidesMaker, slideNumber: number) {
    const newSlidesMaker = setSelectedSlide({...slidesMaker}, slideNumber);

    return ReactDOM.render(
        <React.StrictMode>
            <App appModel={newSlidesMaker} />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

const scrollSlideList = (className: string, deltaX: number) => {
    const slideList = document.getElementsByClassName(className)[0];
    slideList.scrollTo({
        left: slideList.scrollLeft + deltaX,
        behavior: "smooth",
    });
}

function addNewSlide(slidesMaker: SlidesMaker) {
    const newSlidesMaker = addSlide(slidesMaker);
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
            <Button className="slide-list-scroll-button" text="<" onClick={ () => {
                scrollSlideList(props.className, -600);
            }}></Button>
            <div className={props.className}>
                {listItems}
                <Button className="slide-list-add-button" text="+" onClick={() => {
                    addNewSlide(props.slidesMaker);
                }}></Button>
            </div>
            <Button className="slide-list-scroll-button" text=">" onClick={ () => {
                scrollSlideList(props.className, 600);
            }}></Button>
        </div>
    )
}

export {
    SlideListView,
}

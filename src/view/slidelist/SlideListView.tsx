import React from "react";
import {SlideView} from "../slide/SlideView";
import {SlidesMaker, addSlide, setSelectedSlide} from "../../model/SlidesMaker";
import {Button} from "../controls/Button";

interface SlideListViewProps {
    className: string;
    slidesMaker: SlidesMaker;
    onChange: (newState: SlidesMaker) => any;
}

const scrollSlideList = (className: string, deltaX: number) => {
    const slideList = document.getElementsByClassName(className)[0];
    slideList.scrollTo({
        left: slideList.scrollLeft + deltaX,
        behavior: "smooth",
    });
}

function SlideListView(props: SlideListViewProps) {
    const listItems = props.slidesMaker.slideList.map((value) => {
        const slideNumber = props.slidesMaker.slideList.findIndex(value1 => value1 == value);

        let cssStyleName: string;
        const isSelectedSlide: boolean = slideNumber === props.slidesMaker.currentSlide;
        isSelectedSlide
         ? cssStyleName = "slide-view-icon-selected"
         : cssStyleName = "slide-view-icon";

        return (<div className="slide-view-icon-container" key={slideNumber} onClick={
                () => {
                    props.onChange(setSelectedSlide(props.slidesMaker, slideNumber));
                }}>
            <SlideView
                className={cssStyleName}
                slidesMaker={props.slidesMaker}
                key={slideNumber}
                slide={props.slidesMaker.slideList[slideNumber]}
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
                    console.log(props.onChange);
                    props.onChange(addSlide(props.slidesMaker));
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

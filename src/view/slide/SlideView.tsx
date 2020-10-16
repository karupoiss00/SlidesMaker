import React from 'react'
import {Slide} from "../../model/slide/Slide";
import {SlidesMaker} from "../../model/SlidesMaker";

interface ISlideViewProps {
    className: string;
    slidesMaker: SlidesMaker;
}

type SlideView = ISlideViewProps & {
    slide: Slide | null;
}

function SlideView(props: SlideView) {
    let background: string;
    let currentSlide;

    if (props.slide === undefined) {
        if (props.slidesMaker.currentSlide !== null) {
            currentSlide = props.slidesMaker.slideList[props.slidesMaker.currentSlide];
        }
        else {
            currentSlide = null;
        }
    }
    else {
        currentSlide = props.slide;
    }

    if (currentSlide !== null)
    {
        background = currentSlide.background.toString();

        if (typeof(currentSlide.background) !== "string")
        {
            background = `center / cover no-repeat url(${currentSlide.background.src})`;
        }

        return (
            <div className={props.className} style={{background: background}}></div>
        )
    }
    else
    {
        return (
            <div className={props.className}></div>
        )
    }
}

export {
    SlideView,
}

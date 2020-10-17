import React from 'react'
import {Slide} from "../../model/slide/Slide";
import {SlidesMaker} from "../../model/SlidesMaker";

interface SlideViewProps {
    className: string;
    slide: Slide | null;
}

function SlideView(props: SlideViewProps) {
    let background: string;
    const currentSlide: Slide | null = props.slide;

    if (currentSlide)
    {
        if (typeof(currentSlide.background) !== "string")
        {
            background = `center / cover no-repeat url(${currentSlide.background.src})`;
        }
        else
        {
            background = currentSlide.background.toString();
        }
    }
    else {
        background = "#ffffff";
    }

    return (
        <div className={props.className} style={{background: background}}></div>
    )

}

export {
    SlideView,
}

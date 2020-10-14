import React from 'react'
import {Slide} from "../../model/slide/Slide";
import {SlidesMaker, setSelectedSlide} from "../../model/SlidesMaker";

interface SlideViewProps {
    slidesMaker: SlidesMaker;
    key: number;
    slide: Slide | null;
    className: string;
}

function SlideView(props: SlideViewProps) {
    let background: string;

    if (props.slide !== null)
    {
        background = props.slide.background.toString();

        if (typeof(props.slide.background) !== "string")
        {
            background = `center / contain no-repeat url(${props.slide.background.src})`;
        }

        return (
            <div className={props.className} style={{background: background, backgroundSize: "cover"}}></div>
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

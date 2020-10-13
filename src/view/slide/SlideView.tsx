import React from 'react'
import {Slide} from "../../model/slide/Slide";
import {Picture} from "../../model/slide/slide_objects/picture/Picture";
import {Background} from "../../model/types/Background";

interface SlideViewProps {
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
            background = `no-repeat url(${props.slide.background.src})`;
            console.log(background);
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

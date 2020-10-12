import React from 'react'
import {Slide} from "../../model/slide/Slide";

interface SlideViewProps {
    slide: Slide | null;
    className: string;
}

function SlideView(props: SlideViewProps) {
    return (
        <div className={props.className}></div>
    )
}

export {
    SlideView,
}

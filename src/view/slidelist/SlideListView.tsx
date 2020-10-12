import React from 'react'
import {Slide} from "../../model/slide/Slide";
import {SlideView} from "../slide/SlideView";

interface SlideViewProps {
    slideList: Array<Slide>;
    className: string;
}

function SlideListView(props: SlideViewProps) {
    const listItems = props.slideList.map((value) => <SlideView className="slide-view-icon" slide={value}></SlideView>);
    return (
        <div className={props.className}>
            listItems
        </div>
    )
}

export {
    SlideListView,
}

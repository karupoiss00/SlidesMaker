import React from 'react'
import {Slide} from "../../model/slide/Slide";
import {SlideView} from "../slide/SlideView";

interface SlideViewProps {
    slideList: Array<Slide>;
    className: string;
}

function SlideListView(props: SlideViewProps) {
    const listItems = props.slideList.map((value) => <SlideView
                                                                className="slide-view-icon"
                                                                slide={value}
                                                                key={
                                                                    props.slideList.findIndex(value1 => value1 == value)
                                                                }/>);
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

import React from "react";
import {Button} from "../controls/Button";
import {SlideView} from "../slide/SlideView";
import {SlidesMaker, addSlide, setSelectedSlide} from "../../model/SlidesMaker";
import styles from "./SlideListView.module.css";

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
         ? cssStyleName = styles.slideViewIconSelected
         : cssStyleName = styles.slideViewIcon;

        return (<div className={styles.slideViewIconContainer} key={slideNumber} onClick={
                () => {
                    props.onChange(setSelectedSlide(props.slidesMaker, slideNumber));
                }}>
            <SlideView
                className={cssStyleName}
                key={slideNumber}
                slide={props.slidesMaker.slideList[slideNumber]}
            />
            {
                isSelectedSlide &&
                    <div id={styles.selectedSlideMarker}></div>
            }
        </div>)

    });

    return (
        <div className={styles.slideListContainer}>
            <Button className={styles.slideListScrollButton} text="<" onClick={ () => {
                scrollSlideList(props.className, -600);
            }}></Button>
            <div className={props.className}>
                {listItems}
                <Button className={styles.slideListAddButton} text="+" onClick={() => {
                    props.onChange(addSlide(props.slidesMaker));
                }}></Button>
            </div>
            <Button className={styles.slideListScrollButton} text=">" onClick={ () => {
                scrollSlideList(props.className, 600);
            }}></Button>
        </div>
    )
}

export {
    SlideListView,
}

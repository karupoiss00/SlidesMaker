import React from "react";
import {Button} from "../controls/Button";
import {SlideView} from "../slide/SlideView";
import {SlidesMakerSlideType} from "../../model/SlidesMaker";
import styles from "./SlideListView.module.css";
import ArrowLeft from "./arrow_left.svg"
import ArrowRight from "./arrow_right.svg"
import Plus from "./plus.svg";

const SLIDE_VIEW_ICON_SCALE = 0.25;

interface SlideListViewProps {
    slideList: Array<SlidesMakerSlideType>;
    currentSlide: number | null;
    onChangeSelectedSlide: (newSlide: number) => any;
    onAddSlide: () => any;
}

const scrollSlideList = (className: string, deltaX: number) => {
    const slideList = document.getElementsByClassName(className)[0];
    slideList.scrollTo({
        left: slideList.scrollLeft + deltaX,
        behavior: "smooth",
    });
}

function SlideListView(props: SlideListViewProps) {
    const listItems = props.slideList.map((value) => {
        const slideNumber = props.slideList.findIndex(value1 => value1 === value);

        let cssStyleName: string;
        const isSelectedSlide: boolean = slideNumber === props.currentSlide;
        isSelectedSlide
         ? cssStyleName = styles.slideViewIconSelected
         : cssStyleName = styles.slideViewIcon; 
        return (<div className={styles.slideViewIconContainer} key={slideNumber} onClick={
                () => {
                    props.onChangeSelectedSlide(slideNumber);
                }}>
                    <SlideView
                        className={cssStyleName}
                        slide={props.slideList[slideNumber].slide}
                        selectedObjectId={null}
                        update={() => {
                            return;
                        }}
                        key={props.slideList[slideNumber].id}
                        scale={SLIDE_VIEW_ICON_SCALE}
                    />
                    {
                        isSelectedSlide &&
                            <div className={styles.selectedSlideMarker}/>
                    }
                </div>)

    });

    return (
        <div className={styles.slideListContainer}>
            <Button className={styles.slideListScrollButton} onClick={ () => {
                scrollSlideList(styles.slideList, -600);
            }}>
                <img src={ArrowLeft} alt={"Oops!"}/>
            </Button>
            <div className={styles.slideList}>
                {listItems}
                <Button className={styles.slideListAddButton} children={
                    <img src={Plus} alt={"Oops!"}/>
                } onClick={() => {
                    props.onAddSlide();
                }}/>
            </div>
            <Button className={styles.slideListScrollButton} onClick={ () => {
                scrollSlideList(styles.slideList, 600);
            }}>
                <img src={ArrowRight} alt={"Oops!"}/>
            </Button>

        </div>
    )
}

export {
    SlideListView,
}

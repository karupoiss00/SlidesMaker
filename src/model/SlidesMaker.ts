import {createSlide, Slide} from "./Slide/Slide";

type SlidesMaker = {
    slideList: Array<Slide>,
    currentSlide: number,
}

function addSlide(slidesMaker: SlidesMaker): SlidesMaker {
    let newSlidesMaker = {...slidesMaker};

    newSlidesMaker.slideList.push(createSlide());
    newSlidesMaker.currentSlide = newSlidesMaker.slideList.length - 1;

    return newSlidesMaker;
}

function deleteSlide(slidesMaker: SlidesMaker): SlidesMaker {
    let newSlidesMaker = {...slidesMaker};

    newSlidesMaker.slideList.splice(newSlidesMaker.currentSlide, 1);
    newSlidesMaker.currentSlide = newSlidesMaker.slideList.length - 1;

    return newSlidesMaker;
}

export type {SlidesMaker};


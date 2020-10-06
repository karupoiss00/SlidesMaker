import {createSlide, Slide} from "./slide/Slide";

type SlidesMaker = {
    slideList: Array<Slide>,
    currentSlide: number,
}

function addSlide(slidesMaker: SlidesMaker): SlidesMaker {
	const newSlidesMaker = {...slidesMaker};

	newSlidesMaker.slideList.push(createSlide());
	newSlidesMaker.currentSlide = newSlidesMaker.slideList.length - 1;

	return newSlidesMaker;
}

function deleteSlide(slidesMaker: SlidesMaker): SlidesMaker {
	const newSlidesMaker = {...slidesMaker};

	newSlidesMaker.slideList.splice(newSlidesMaker.currentSlide, 1);
	newSlidesMaker.currentSlide = newSlidesMaker.slideList.length - 1;

	return newSlidesMaker;
}

export type {SlidesMaker};
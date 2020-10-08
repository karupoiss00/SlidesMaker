import { createSlide, Slide } from './slide/Slide';

export type SlidesMaker = {
    slideList: Array<Slide>;
    currentSlide: number;
};

function createSlidesMaker(): SlidesMaker {
    return {
        slideList: [createSlide()],
        currentSlide: 0,
    };
}

function addSlide(slidesMaker: SlidesMaker): SlidesMaker {
    const newSlidesMaker = { ...slidesMaker };
    newSlidesMaker.slideList.push(createSlide());
    newSlidesMaker.currentSlide = newSlidesMaker.slideList.length - 1;

    return newSlidesMaker;
}

function deleteSlide(slidesMaker: SlidesMaker): SlidesMaker {
    const newSlidesMaker = { ...slidesMaker };

    newSlidesMaker.slideList.splice(newSlidesMaker.currentSlide, 1);
    newSlidesMaker.currentSlide = newSlidesMaker.slideList.length - 1;

    return newSlidesMaker;
}

function setSelectedSlide(slidesMaker: SlidesMaker, newSelectedSlide: number): SlidesMaker {
    const newSlidesMaker = { ...slidesMaker };

    newSlidesMaker.currentSlide = newSelectedSlide;

    return newSlidesMaker;
}

export { createSlidesMaker, addSlide, deleteSlide, setSelectedSlide };
import {Slide, createSlide, removeObject, addObject} from './slide/Slide';
import {generateId, Id} from "./slide/slide_objects/id/Id";
import {TextBox} from "./slide/slide_objects/textbox/TextBox";
import {Shape} from "./slide/slide_objects/shape/Shape";
import {Picture} from "./slide/slide_objects/picture/Picture";
import {Background} from "./types/Background";

type SlidesMakerSlideType = {
    slide: Slide;
    id: Id;
}

export type SlidesMaker = {
    slideList: Array<SlidesMakerSlideType>;
    selectedObjectId: Id | null;
    currentSlide: number | null;
}

function createSlidesMaker(): SlidesMaker {
    return {
        slideList: [{
            slide: createSlide(),
            id: generateId(),
        }],
        selectedObjectId: null,
        currentSlide: 0,
    };
}

function addSlide(slidesMaker: SlidesMaker): SlidesMaker {
    const newSlidesMaker: SlidesMaker = {...slidesMaker};

    newSlidesMaker.slideList.push({
        slide: createSlide(),
        id: generateId(),
    });
    newSlidesMaker.currentSlide = newSlidesMaker.slideList.length - 1;

    return newSlidesMaker;
}

function deleteSlide(slidesMaker: SlidesMaker): SlidesMaker {
    const newSlidesMaker: SlidesMaker = {...slidesMaker};

    if (newSlidesMaker.currentSlide !== null) {
        newSlidesMaker.slideList.splice(newSlidesMaker.currentSlide, 1);
        newSlidesMaker.currentSlide = newSlidesMaker.slideList.length - 1;
    }

    return newSlidesMaker;
}

function setSelectedSlide(slidesMaker: SlidesMaker, newSelectedSlide: number): SlidesMaker {
    const newSlidesMaker: SlidesMaker = {...slidesMaker};

    newSlidesMaker.currentSlide = newSelectedSlide;

    return newSlidesMaker;
}

function addObjectOnSelectedSlide(slidesMaker: SlidesMaker, object: TextBox | Shape | Picture): SlidesMaker {
    const newSlidesMaker: SlidesMaker = {...slidesMaker};

    if (newSlidesMaker.currentSlide !== null) {
        let currentSlide: SlidesMakerSlideType = newSlidesMaker.slideList[newSlidesMaker.currentSlide];

        currentSlide = {
            ...currentSlide,
            slide: addObject(currentSlide.slide, object),
        }

        newSlidesMaker.slideList[newSlidesMaker.currentSlide] = currentSlide;
    }

    return newSlidesMaker;
}

function removeSelectedObject(slidesMaker: SlidesMaker): SlidesMaker {
    const newSlidesMaker: SlidesMaker = {...slidesMaker};

    if (newSlidesMaker.currentSlide !== null && newSlidesMaker.selectedObjectId) {
        let selectedObjectId: Id | null = newSlidesMaker.selectedObjectId;
        let currentSlide: SlidesMakerSlideType = newSlidesMaker.slideList[newSlidesMaker.currentSlide];

        currentSlide = {
            ...currentSlide,
            slide: removeObject(currentSlide.slide, selectedObjectId),
        }
        selectedObjectId = null;

        newSlidesMaker.slideList[newSlidesMaker.currentSlide] = currentSlide;
        newSlidesMaker.selectedObjectId = selectedObjectId;
    }

    return newSlidesMaker;
}

function setBackground(slidesMaker: SlidesMaker, background: Background): SlidesMaker {
    const newSlidesMaker: SlidesMaker = {...slidesMaker};

    if (newSlidesMaker.currentSlide !== null)
    {
        const currentSlide: SlidesMakerSlideType = newSlidesMaker.slideList[newSlidesMaker.currentSlide];

        currentSlide.slide.background = background;

        newSlidesMaker.slideList[newSlidesMaker.currentSlide] = currentSlide;
    }

    return newSlidesMaker;
}

export {
    createSlidesMaker,
    addSlide,
    deleteSlide,
    setSelectedSlide,
    addObjectOnSelectedSlide,
    removeSelectedObject,
    setBackground,
};
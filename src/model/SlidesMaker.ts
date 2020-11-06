import {Slide, createSlide, removeObject, addObject} from './slide/Slide';
import {generateId, Id} from "./slide/slide_objects/id/Id";
import {TextBox} from "./slide/slide_objects/textbox/TextBox";
import {Shape} from "./slide/slide_objects/shape/Shape";
import {Picture} from "./slide/slide_objects/picture/Picture";
import {Background} from "./types/Background";


function deepFreeze(o: Record<string, any>) {
    Object.freeze(o);

    Object.getOwnPropertyNames(o).forEach(function (prop) {
        if (prop in o
            && o[prop] !== null
            && (typeof o[prop] === "object" || typeof o[prop] === "function")
            && !Object.isFrozen(o[prop])) {
            deepFreeze(o[prop]);
        }
    });

    return o;
}

let deepClone = <T>(source: T): { [k: string]: any } => {
    let results: { [k: string]: any } = {};
    for (let P in source) {
        if (typeof source[P] === 'object') {
            results[P] = deepClone(source[P]);
        } else {
            results[P] = source[P];
        }
    }
    return results;
};

export type SlidesMakerSlideType = {
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
    deepFreeze(slidesMaker);
    const newSlidesMaker: SlidesMaker = deepClone(slidesMaker) as SlidesMaker;

    newSlidesMaker.slideList.push({
        slide: createSlide(),
        id: generateId(),
    });
    newSlidesMaker.currentSlide = newSlidesMaker.slideList.length - 1;

    return newSlidesMaker;
}

function deleteSlide(slidesMaker: SlidesMaker): SlidesMaker {
    deepFreeze(slidesMaker);
    const newSlidesMaker: SlidesMaker = deepClone(slidesMaker) as SlidesMaker;

    if (newSlidesMaker.currentSlide !== null) {
        newSlidesMaker.slideList.splice(newSlidesMaker.currentSlide, 1);
        newSlidesMaker.currentSlide = newSlidesMaker.slideList.length - 1;
    }

    return newSlidesMaker;
}

function setSelectedSlide(slidesMaker: SlidesMaker, newSelectedSlide: number): SlidesMaker {
    deepFreeze(slidesMaker);
    const newSlidesMaker: SlidesMaker = deepClone(slidesMaker) as SlidesMaker;

    newSlidesMaker.currentSlide = newSelectedSlide;

    return newSlidesMaker;
}

function setSelectedObject(slidesMaker: SlidesMaker, newSelectedObject: Id | null): SlidesMaker {
    deepFreeze(slidesMaker);
    const newSlidesMaker: SlidesMaker = deepClone(slidesMaker) as SlidesMaker;

    newSlidesMaker.selectedObjectId = newSelectedObject;

    return newSlidesMaker;
}

function addObjectOnSelectedSlide(slidesMaker: SlidesMaker, object: TextBox | Shape | Picture): SlidesMaker {
    deepFreeze(slidesMaker);
    const newSlidesMaker: SlidesMaker = deepClone(slidesMaker) as SlidesMaker;

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
    deepFreeze(slidesMaker);
    const newSlidesMaker: SlidesMaker = deepClone(slidesMaker) as SlidesMaker;

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
    deepFreeze(slidesMaker);
    const newSlidesMaker: SlidesMaker = deepClone(slidesMaker) as SlidesMaker;

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
    setSelectedObject,
    addObjectOnSelectedSlide,
    removeSelectedObject,
    setBackground,
};
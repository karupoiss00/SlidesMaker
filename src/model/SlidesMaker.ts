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

function deepClone<T>(source: T): { [k: string]: any } {
    const results: { [k: string]: any } = [];
    for (const P in source) {
        if (typeof source[P] === 'object') {
            results[P] = deepClone(source[P]);
        } else {
            results[P] = source[P];
        }
    }
    return results;
}

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
    const slideList = deepClone(slidesMaker.slideList) as Array<SlidesMakerSlideType>;

    slideList.push({
        slide: createSlide(),
        id: generateId(),
    });

    return {
        ...slidesMaker,
        slideList: slideList,
        currentSlide: slideList.length - 1
    };
}

function deleteSlide(slidesMaker: SlidesMaker, slideNumber: number): SlidesMaker {
    deepFreeze(slidesMaker);
    const slideList = deepClone(slidesMaker.slideList) as Array<SlidesMakerSlideType>;

    if (slidesMaker.currentSlide !== null) {
        if (slideNumber < slideList.length)
        {
            slideList.splice(slideNumber, 1);
        }
    }

    return {
        ...slidesMaker,
        slideList: slideList,
        currentSlide: slideList.length - 1
    };
}

function setSelectedSlide(slidesMaker: SlidesMaker, newSelectedSlide: number): SlidesMaker {
    deepFreeze(slidesMaker);
    return {
        ...slidesMaker,
        currentSlide: newSelectedSlide
    };
}

function setSelectedObject(slidesMaker: SlidesMaker, newSelectedObject: Id | null): SlidesMaker {
    deepFreeze(slidesMaker);
    return {
        ...slidesMaker,
        selectedObjectId: newSelectedObject
    };
}

function addObjectOnSelectedSlide(slidesMaker: SlidesMaker, object: TextBox | Shape | Picture): SlidesMaker {
    deepFreeze(slidesMaker);
    const slideList = deepClone(slidesMaker.slideList) as Array<SlidesMakerSlideType>;

    if (slidesMaker.currentSlide !== null) {
        const currentSlide: SlidesMakerSlideType = slideList[slidesMaker.currentSlide];

        slideList[slidesMaker.currentSlide] = {
            ...currentSlide,
            slide: addObject({...currentSlide.slide}, object)
        };
    }

    return {
        ...slidesMaker,
        slideList: slideList
    };
}

function removeSelectedObject(slidesMaker: SlidesMaker): SlidesMaker {
    deepFreeze(slidesMaker);
    const slideList = deepClone(slidesMaker.slideList) as Array<SlidesMakerSlideType>;

    if (slidesMaker.currentSlide !== null && slidesMaker.selectedObjectId) {
        let selectedObjectId: Id | null = slidesMaker.selectedObjectId;
        let currentSlide: SlidesMakerSlideType = {...slideList[slidesMaker.currentSlide]};

        currentSlide = {
            ...currentSlide,
            slide: removeObject(currentSlide.slide, selectedObjectId),
        }
        selectedObjectId = null;

        slideList[slidesMaker.currentSlide] = currentSlide;
    }

    return {
        ...slidesMaker,
        slideList: slideList,
        selectedObjectId: null
    };
}

function setBackground(slidesMaker: SlidesMaker, background: Background): SlidesMaker {
    deepFreeze(slidesMaker);
    const slideList = deepClone(slidesMaker.slideList) as Array<SlidesMakerSlideType>;

    if (slidesMaker.currentSlide !== null)
    {
        let currentSlide: SlidesMakerSlideType = slideList[slidesMaker.currentSlide];
        const slide: Slide = currentSlide.slide;

        slide.background = background;

        currentSlide = {
            ...currentSlide,
            slide: slide
        };
        slideList[slidesMaker.currentSlide] = currentSlide;
    }

    return {
        ...slidesMaker,
        slideList: slideList
    };
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
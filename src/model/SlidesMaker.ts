import {Slide, createSlide, removeObject, addObject, moveObjectToForeground} from './slide/Slide';
import {generateId, Id} from "./slide/slide_objects/id/Id";
import {TextBox} from "./slide/slide_objects/textbox/TextBox";
import {Shape} from "./slide/slide_objects/shape/Shape";
import {Picture} from "./slide/slide_objects/picture/Picture";
import {Background} from "./types/Background";
import {Rect} from "./types/Rect";


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
    const results: { [k: string]: any } = Array.isArray(source) ? [] : {};
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
    return {
        ...slidesMaker,
        currentSlide: slidesMaker.slideList.length,
        slideList: [
            ...slidesMaker.slideList,
            {
                slide: createSlide(),
                id: generateId(),
            }
        ],
    };
}

function deleteSlide(slidesMaker: SlidesMaker): SlidesMaker {
    deepFreeze(slidesMaker);
    const slideList: Array<SlidesMakerSlideType> = deepClone(slidesMaker.slideList) as Array<SlidesMakerSlideType>;
    if (slidesMaker.currentSlide !== null) {
        slideList.splice(slidesMaker.currentSlide, 1);
    }

    let newCurrentSlide: number | null;

    if (slidesMaker.currentSlide !== null && slideList.length > 0) {
        slidesMaker.currentSlide !== 0
            ? newCurrentSlide = slidesMaker.currentSlide - 1
            : newCurrentSlide = 0;
    }
    else
    {
        newCurrentSlide = null;
    }

    return {
        ...slidesMaker,
        slideList: slideList,
        currentSlide: newCurrentSlide,
    };
}

function setSelectedSlide(slidesMaker: SlidesMaker, newSelectedSlide: number): SlidesMaker {
    deepFreeze(slidesMaker);
    return {
        ...slidesMaker,
        currentSlide: slidesMaker.slideList[newSelectedSlide] ? newSelectedSlide : slidesMaker.currentSlide
    };
}

function setSelectedObject(slidesMaker: SlidesMaker, newSelectedObject: Id | null): SlidesMaker {
    deepFreeze(slidesMaker);
    const slideList: Array<SlidesMakerSlideType> = deepClone(slidesMaker.slideList) as Array<SlidesMakerSlideType>;
    if (slidesMaker.currentSlide !== null && newSelectedObject) {
        let currentSlide: SlidesMakerSlideType = deepClone(slidesMaker.slideList[slidesMaker.currentSlide]) as SlidesMakerSlideType;

        currentSlide = {
            ...currentSlide,
            slide: moveObjectToForeground(currentSlide.slide, newSelectedObject),
        }

        slideList[slidesMaker.currentSlide] = currentSlide;
    }

    return {
        ...slidesMaker,
        slideList: slideList,
        selectedObjectId: newSelectedObject
    };
}

function addObjectOnSelectedSlide(slidesMaker: SlidesMaker, object: TextBox | Shape | Picture): SlidesMaker {
    deepFreeze(slidesMaker);
    const slideList: Array<SlidesMakerSlideType> = deepClone(slidesMaker.slideList) as Array<SlidesMakerSlideType>;
    if (slidesMaker.currentSlide !== null) {
        let currentSlide: SlidesMakerSlideType = deepClone(slidesMaker.slideList[slidesMaker.currentSlide]) as SlidesMakerSlideType;

        currentSlide = {
            ...currentSlide,
            slide: addObject(currentSlide.slide, object),
        }

        slideList[slidesMaker.currentSlide] = currentSlide;
    }

    return {
        ...slidesMaker,
        slideList: slideList,
    };
}

interface ObjectData {
    objectId: Id;
    newRect: Rect;
}
function updateObjectRect(slidesMaker: SlidesMaker, newObjectData: ObjectData): SlidesMaker {
    deepFreeze(slidesMaker);
    const slideList: Array<SlidesMakerSlideType> = deepClone(slidesMaker.slideList) as Array<SlidesMakerSlideType>;

    if (slidesMaker.currentSlide !== null) {
        const currentSlide: Slide = deepClone(slidesMaker.slideList[slidesMaker.currentSlide].slide) as Slide;
        const objectNumber: number = currentSlide.objects.findIndex(obj => obj.id === newObjectData.objectId);
        currentSlide.objects[objectNumber].object.rect = {...newObjectData.newRect};

        slideList[slidesMaker.currentSlide].slide = currentSlide;
    }

    return {
        ...slidesMaker,
        slideList: slideList,
    };
}

interface TextBoxData {
    objectId: Id;
    newText: string;
}

function updateTextBoxText(slidesMaker: SlidesMaker, newTextBoxData: TextBoxData): SlidesMaker {
    deepFreeze(slidesMaker);
    const slideList: Array<SlidesMakerSlideType> = deepClone(slidesMaker.slideList) as Array<SlidesMakerSlideType>;

    if (slidesMaker.currentSlide !== null) {
        const currentSlide: Slide = deepClone(slidesMaker.slideList[slidesMaker.currentSlide].slide) as Slide;
        const objectNumber: number = currentSlide.objects.findIndex(obj => obj.id === newTextBoxData.objectId);
        // @ts-ignore
        currentSlide.objects[objectNumber].object.text = newTextBoxData.newText;

        slideList[slidesMaker.currentSlide].slide = currentSlide;
    }

    return {
        ...slidesMaker,
        slideList: slideList,
    };
}

function removeSelectedObject(slidesMaker: SlidesMaker): SlidesMaker {
    deepFreeze(slidesMaker);
    const slideList: Array<SlidesMakerSlideType> = deepClone(slidesMaker.slideList) as Array<SlidesMakerSlideType>;
    let selectedObjectId: Id | null = slidesMaker.selectedObjectId;

    if (slidesMaker.currentSlide !== null && selectedObjectId) {
        let currentSlide: SlidesMakerSlideType = deepClone(slidesMaker.slideList[slidesMaker.currentSlide]) as SlidesMakerSlideType;

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
        selectedObjectId: selectedObjectId
    };
}

function setBackground(slidesMaker: SlidesMaker, background: Background): SlidesMaker {
    deepFreeze(slidesMaker);
    const slideList: Array<SlidesMakerSlideType> = deepClone(slidesMaker.slideList) as Array<SlidesMakerSlideType>;

    if (slidesMaker.currentSlide !== null)
    {
        const currentSlide: SlidesMakerSlideType = deepClone(slidesMaker.slideList[slidesMaker.currentSlide]) as SlidesMakerSlideType;

        currentSlide.slide.background = background;

        slideList[slidesMaker.currentSlide] = currentSlide;
    }

    return {
        ...slidesMaker,
        slideList: slideList,
    };
}

export {
    createSlidesMaker,
    addSlide,
    deleteSlide,
    setSelectedSlide,
    setSelectedObject,
    updateObjectRect,
    updateTextBoxText,
    addObjectOnSelectedSlide,
    removeSelectedObject,
    setBackground,
    deepClone
};
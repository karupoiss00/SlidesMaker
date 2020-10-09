import {addShape, addTextBox, createSlide, removePicture, removeShape, removeTextBox, Slide} from './slide/Slide';
import {ShapeType} from "./slide/slide_objects/shape/ShapeType";
import {addPicture} from "./slide/Slide";

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
    const newSlidesMaker: SlidesMaker = { ...slidesMaker };
    newSlidesMaker.slideList.push(createSlide());
    newSlidesMaker.currentSlide = newSlidesMaker.slideList.length - 1;

    return {...newSlidesMaker};
}

function deleteSlide(slidesMaker: SlidesMaker): SlidesMaker {
    const newSlidesMaker: SlidesMaker = { ...slidesMaker };

    newSlidesMaker.slideList.splice(newSlidesMaker.currentSlide, 1);
    newSlidesMaker.currentSlide = newSlidesMaker.slideList.length - 1;

    return {...newSlidesMaker};
}

function setSelectedSlide(slidesMaker: SlidesMaker, newSelectedSlide: number): SlidesMaker {
    const newSlidesMaker: SlidesMaker = { ...slidesMaker };

    newSlidesMaker.currentSlide = newSelectedSlide;

    return {...newSlidesMaker};
}

function addTextBoxOnSelectedSlide(slidesMaker: SlidesMaker): SlidesMaker {
    const newSlidesMaker: SlidesMaker = { ...slidesMaker };
    let currentSlide: Slide = newSlidesMaker.slideList[newSlidesMaker.currentSlide];
    currentSlide = addTextBox(currentSlide);
    return {...newSlidesMaker};
}

function addShapeOnSelectedSlide(slidesMaker: SlidesMaker, shapeType: ShapeType): SlidesMaker {
    const newSlidesMaker: SlidesMaker = { ...slidesMaker };
    let currentSlide: Slide = newSlidesMaker.slideList[newSlidesMaker.currentSlide];
    currentSlide = addShape(currentSlide, shapeType);
    return {...newSlidesMaker};
}

function addPictureOnSelectedSlide(slidesMaker: SlidesMaker, src: string): SlidesMaker {
    const newSlidesMaker: SlidesMaker = { ...slidesMaker };
    let currentSlide: Slide = newSlidesMaker.slideList[newSlidesMaker.currentSlide];
    currentSlide = addPicture(currentSlide, src);
    return {...newSlidesMaker};
}

function removeSelectedObject(slidesMaker: SlidesMaker, objectType: 'textbox' | 'shape' | 'picture'): SlidesMaker {
    const newSlidesMaker: SlidesMaker = { ...slidesMaker };
    let currentSlide: Slide = newSlidesMaker.slideList[newSlidesMaker.currentSlide];

    switch (objectType) {
        case 'textbox':
            currentSlide = removeTextBox(currentSlide);
            break;
        case 'shape':
            currentSlide = removeShape(currentSlide);
            break;
        case 'picture':
            currentSlide = removePicture(currentSlide);
            break;
    }

    return {...newSlidesMaker};
}

export {
    createSlidesMaker,
    addSlide,
    deleteSlide,
    setSelectedSlide,
    addTextBoxOnSelectedSlide,
    addShapeOnSelectedSlide,
    addPictureOnSelectedSlide,
    removeSelectedObject
};
import {TextBox} from './slide_objects/textbox/TextBox';
import {Picture} from './slide_objects/picture/Picture';
import {Shape} from './slide_objects/shape/Shape';
import {Background} from '../types/Background';
import {Colors} from '../types/Colors';
import {Id, generateId} from "./slide_objects/id/Id";

export type Slide = {
    objects: Record<Id, TextBox | Shape | Picture>;
    background: Background;
};

function createSlide(): Slide {
    return {
        objects: {},
        background: Colors.WHITE,
    };
}

function addObject(slide: Slide, object: TextBox | Shape | Picture): Slide {
    const newSlide = { ...slide };

    newSlide.objects[generateId()] = object;

    return newSlide;
}

function removeObject(slide: Slide, selectedObjectId: Id): Slide {
    const newSlide = { ...slide };

    if (newSlide.objects[selectedObjectId]) {
        delete newSlide.objects[selectedObjectId];
    }

    return newSlide;
}

function setSlideBackgroundColor(slide: Slide, color: Colors): Slide {
    const newSlide = { ...slide };

    newSlide.background = color;

    return newSlide;
}

function setSlideBackgroundPicture(slide: Slide, picture: Picture): Slide {
    const newSlide = { ...slide };

    newSlide.background = picture;

    return newSlide;
}

export { createSlide, addObject, removeObject, setSlideBackgroundColor, setSlideBackgroundPicture };
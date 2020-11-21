import {TextBox} from './slide_objects/textbox/TextBox';
import {Picture} from './slide_objects/picture/Picture';
import {Shape} from './slide_objects/shape/Shape';
import {Background} from '../types/Background';
import {Colors} from '../types/Colors';
import {Id, generateId} from "./slide_objects/id/Id";

type SlideObjectType = {
    object: TextBox | Shape | Picture;
    id: Id;
}

export type Slide = {
    objects: Array<SlideObjectType>;
    background: Background;
}

function createSlide(): Slide {
    return {
        objects: [],
        background: Colors.WHITE,
    };
}

function addObject(slide: Slide, object: TextBox | Shape | Picture): Slide {
    const newSlide = { ...slide };

    newSlide.objects.push({
        object: object,
        id: generateId(),
    });

    return newSlide;
}

function removeObject(slide: Slide, selectedObjectId: Id): Slide {
    const newSlide = { ...slide };

    const objectArray: Array<SlideObjectType> = newSlide.objects;

    objectArray.forEach((object, index, objectArray) => {
        if (object.id === selectedObjectId) {
            objectArray.slice(index);
        }
    })

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

export {createSlide, addObject, removeObject, setSlideBackgroundColor, setSlideBackgroundPicture};
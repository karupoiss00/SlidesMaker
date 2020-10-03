import {createTextBox, TextBox} from "../textbox/TextBox";
import {createPicture, Picture} from "../picture/Picture";
import {createShape, Shape} from "../shape/Shape";
import {ShapeType} from "../shape/ShapeType";
import {Background} from "../types/Background";
import {Color} from "../types/Color";

export type Slide = {
    textBoxes: Array<TextBox>,
    selectedTextBox: number,
    shapes: Array<Shape>,
    selectedShape: number,
    pictures: Array<Picture>,
    selectedPicture: number,
    background: Background
}

function createSlide(): Slide {
    return {
        textBoxes: [],
        selectedTextBox: -1,
        shapes: [],
        selectedShape: -1,
        pictures: [],
        selectedPicture: -1,
        background: Color.WHITE,
    }
}

function addTextBox(slide: Slide): Slide {
    let newSlide = {...slide};
    newSlide.textBoxes.push(createTextBox());
    newSlide.selectedTextBox = newSlide.textBoxes.length - 1;
    return {...newSlide};
}

function addShape(slide: Slide, shapeType: ShapeType): Slide {
    let newSlide = {...slide};
    newSlide.shapes.push(createShape(shapeType));
    newSlide.selectedShape= newSlide.shapes.length - 1;
    return {...newSlide};
}

function addImage(slide: Slide, src: string): Slide {
    let newSlide = {...slide};
    newSlide.pictures.push(createPicture(src));
    newSlide.selectedPicture = newSlide.pictures.length - 1;

    return {...newSlide};
}

export {createSlide}
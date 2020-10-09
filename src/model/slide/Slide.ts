import { createTextBox, TextBox } from './slide_objects/textbox/TextBox';
import { createPicture, Picture } from './slide_objects/picture/Picture';
import { createShape, Shape } from './slide_objects/shape/Shape';
import { ShapeType } from './slide_objects/shape/ShapeType';
import { Background } from '../types/Background';
import { Colors } from '../types/Colors';

export type Slide = {
    textBoxes: Array<TextBox>;
    selectedTextBox: number | null;
    shapes: Array<Shape>;
    selectedShape: number | null;
    pictures: Array<Picture>;
    selectedPicture: number | null;
    background: Background;
};

function createSlide(): Slide {
    return {
        textBoxes: [],
        selectedTextBox: null,
        shapes: [],
        selectedShape: null,
        pictures: [],
        selectedPicture: null,
        background: Colors.WHITE,
    };
}

function addTextBox(slide: Slide): Slide {
    const newSlide = { ...slide };
    newSlide.textBoxes.push(createTextBox());
    newSlide.selectedTextBox = newSlide.textBoxes.length - 1;
    return { ...newSlide };
}

function addShape(slide: Slide, shapeType: ShapeType): Slide {
    const newSlide = { ...slide };
    newSlide.shapes.push(createShape(shapeType));
    newSlide.selectedShape = newSlide.shapes.length - 1;
    return { ...newSlide };
}

function addPicture(slide: Slide, src: string): Slide {
    const newSlide = { ...slide };
    newSlide.pictures.push(createPicture(src));
    newSlide.selectedPicture = newSlide.pictures.length - 1;
    return { ...newSlide };
}

function removeTextBox(slide: Slide): Slide {
    const newSlide = { ...slide };
    if (newSlide.selectedTextBox != null) {
        newSlide.textBoxes.splice(newSlide.selectedTextBox, 1);
    }
    newSlide.selectedTextBox = null;
    return { ...newSlide };
}

function removeShape(slide: Slide): Slide {
    const newSlide = { ...slide };
    if (newSlide.selectedShape != null) {
        newSlide.shapes.splice(newSlide.selectedShape, 1);
    }
    newSlide.selectedShape = null;
    return { ...newSlide };
}

function removePicture(slide: Slide): Slide {
    const newSlide = { ...slide };
    if (newSlide.selectedPicture != null) {
        newSlide.pictures.splice(newSlide.selectedPicture, 1);
    }
    newSlide.selectedPicture = null;
    return { ...newSlide };
}

export { createSlide, addTextBox, addShape, addPicture, removeTextBox, removeShape, removePicture };
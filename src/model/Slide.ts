import {TextBox} from "./textbox/TextBox";
import {Shape} from "./shape/Shape";
import {Picture} from "./picture/Picture";
import {Background} from "./Background";

type Slide = {
    textBoxes: Array<TextBox>,
    selectedTextBox: number,
    shapes: Array<Shape>,
    selectedShape: number,
    images: Array<Picture>,
    selectedImage: number,
    background: Background
}

export type {Slide}
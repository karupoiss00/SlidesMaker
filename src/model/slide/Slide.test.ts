import {Colors} from "../types/Colors";
import {addPicture, addShape, addTextBox, createSlide, removePicture, removeShape, removeTextBox} from "./Slide";
import {createRect} from "../types/rect/Rect";
import {createParagraph} from "../types/paragraph/Paragraph";
import {createFont} from "../types/font/Font";
import {createTextBox, TextBox} from "./slide_objects/textbox/TextBox";
import {createShape, Shape} from "./slide_objects/shape/Shape";
import {createPicture, Picture} from "./slide_objects/picture/Picture";
import {createStyle} from "../types/style/Style";
import {ShapeType} from "./slide_objects/shape/ShapeType";

const TestTextBox0: TextBox = {
    text: 'Тестовый текст 0',
    rect: createRect(),
    paragraph: createParagraph(),
    font: createFont(),
};
const TestTextBox1: TextBox = {
    text: 'Тестовый текст 1',
    rect: createRect(),
    paragraph: createParagraph(),
    font: createFont(),
};

const TestShape0: Shape = {
    shapeType: ShapeType.ELLIPSE,
    rect: createRect(),
    style: createStyle(),
};
const TestShape1: Shape = {
    shapeType: ShapeType.TRIANGLE,
    rect: createRect(),
    style: createStyle(),
};
const TestShape2: Shape = {
    shapeType: ShapeType.RECTANGLE,
    rect: createRect(),
    style: createStyle(),
};

const TestPicture0: Picture = {
    src: 'C:/Pictures/picture0.jpeg',
    rect: createRect(),
};
const TestPicture1: Picture = {
    src: 'C:/Pictures/picture1.jpeg',
    rect: createRect(),
};

const TestSlide = {
    textBoxes: [TestTextBox0, TestTextBox1],
    selectedTextBox: 1,
    shapes: [TestShape0, TestShape1, TestShape2],
    selectedShape: 1,
    pictures: [TestPicture0, TestPicture1],
    selectedPicture: 0,
    background: Colors.RED,
};

describe('Slide.ts', () => {
    test('Slide: createSlide', () => {
        expect({
            textBoxes: [],
            selectedTextBox: null,
            shapes: [],
            selectedShape: null,
            pictures: [],
            selectedPicture: null,
            background: Colors.WHITE,
        }).toStrictEqual(createSlide());
    });

    test('Slide: addTextBox', () => {
        expect({
            textBoxes: [TestTextBox0, TestTextBox1, createTextBox()],
            selectedTextBox: 2,
            shapes: [TestShape0, TestShape1, TestShape2],
            selectedShape: 1,
            pictures: [TestPicture0, TestPicture1],
            selectedPicture: 0,
            background: Colors.RED,
        }).toStrictEqual(addTextBox(TestSlide));
    });

    test('Slide: addShape', () => {
        expect({
            textBoxes: [TestTextBox0, TestTextBox1],
            selectedTextBox: 1,
            shapes: [TestShape0, TestShape1, TestShape2, createShape(ShapeType.ELLIPSE)],
            selectedShape: 3,
            pictures: [TestPicture0, TestPicture1],
            selectedPicture: 0,
            background: Colors.RED,
        }).toStrictEqual(addShape(TestSlide, ShapeType.ELLIPSE));
    });

    test('Slide: addPicture', () => {
        expect({
            textBoxes: [TestTextBox0, TestTextBox1],
            selectedTextBox: 1,
            shapes: [TestShape0, TestShape1, TestShape2],
            selectedShape: 1,
            pictures: [TestPicture0, TestPicture1, createPicture('C:/Pictures/picture0.jpeg')],
            selectedPicture: 2,
            background: Colors.RED,
        }).toStrictEqual(addPicture(TestSlide, 'C:/Pictures/picture2.jpeg'));
    });

    test('Slide: removeTextBox', () => {
        expect({
            textBoxes: [TestTextBox0],
            selectedTextBox: null,
            shapes: [TestShape0, TestShape1, TestShape2],
            selectedShape: 1,
            pictures: [TestPicture0, TestPicture1],
            selectedPicture: 0,
            background: Colors.RED,
        }).toStrictEqual(removeTextBox(TestSlide));
    });

    test('Slide: removeShape', () => {
        expect({
            textBoxes: [TestTextBox0, TestTextBox1],
            selectedTextBox: 1,
            shapes: [TestShape0, TestShape2],
            selectedShape: null,
            pictures: [TestPicture0, TestPicture1],
            selectedPicture: 0,
            background: Colors.RED,
        }).toStrictEqual(removeShape(TestSlide));
    });

    test('Slide: removePicture', () => {
        expect({
            textBoxes: [TestTextBox0, TestTextBox1],
            selectedTextBox: 1,
            shapes: [TestShape0, TestShape1, TestShape2],
            selectedShape: 1,
            pictures: [TestPicture1],
            selectedPicture: null,
            background: Colors.RED,
        }).toStrictEqual(removePicture(TestSlide));
    });
});
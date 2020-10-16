import {Colors} from "../types/Colors";
import {Slide, createSlide, addObject, removeObject} from "./Slide";
import {createRect} from "../types/rect/Rect";
import {createParagraph} from "../types/paragraph/Paragraph";
import {createFont} from "../types/font/Font";
import {TextBox} from "./slide_objects/textbox/TextBox";
import {Shape} from "./slide_objects/shape/Shape";
import {Picture} from "./slide_objects/picture/Picture";
import {createStyle} from "../types/style/Style";
import {ShapeType} from "./slide_objects/shape/ShapeType";
import {generateId, Id} from "./slide_objects/id/Id";

describe('Slide.ts', () => {
    test('Slide: createSlide', () => {
        let testSlide: Slide = {
            objects: {},
            background: Colors.WHITE,
        }
        expect(testSlide).toStrictEqual(createSlide());
    });

    test('Slide: addObject(textBox)', () => {
        let testSlide: Slide = {
            objects: {},
            background: Colors.WHITE,
        }
        let testTextBox: TextBox = {
            text: 'Тестовый текст 0',
            rect: createRect(),
            paragraph: createParagraph(),
            font: createFont(),
        };
        testSlide.objects[generateId()] = testTextBox;
        expect(testSlide).toStrictEqual(addObject(testSlide, testTextBox));
    });

    test('Slide: addObject(shape)', () => {
        let testSlide: Slide = {
            objects: {},
            background: Colors.WHITE,
        }
        let testShape: Shape = {
            shapeType: ShapeType.ELLIPSE,
            rect: createRect(),
            style: createStyle(),
        };
        testSlide.objects[generateId()] = testShape;
        expect(testSlide).toStrictEqual(addObject(testSlide, testShape));
    });

    test('Slide: addObject(picture)', () => {
        let testSlide: Slide = {
            objects: {},
            background: Colors.WHITE,
        }
        let testPicture: Picture = {
            src: 'svinya.png',
            rect: createRect(),
        };
        testSlide.objects[generateId()] = testPicture;
        expect(testSlide).toStrictEqual(addObject(testSlide, testPicture));
    });

    test('Slide: removeObject(objectIsSelected)', () => {
        let testSlide: Slide = {
            objects: {},
            background: Colors.WHITE,
        }
        let testPicture: Picture = {
            src: 'svinya.png',
            rect: createRect(),
        };
        let testId: Id = generateId();
        testSlide.objects[testId] = testPicture;
        if (testSlide.objects[testId]) {
            delete testSlide.objects[testId];
        }
        expect(testSlide).toStrictEqual(removeObject(testSlide, testId));
    });
});
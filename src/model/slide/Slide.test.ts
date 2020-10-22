import {Colors} from "../types/Colors";
import {Slide, createSlide, addObject, removeObject} from "./Slide";
import {createRect} from "../types/Rect";
import {createParagraph} from "../types/Paragraph";
import {createFont} from "../types/Font";
import {TextBox} from "./slide_objects/textbox/TextBox";
import {Shape} from "./slide_objects/shape/Shape";
import {Picture} from "./slide_objects/picture/Picture";
import {createStyle} from "../types/Style";
import {ShapeType} from "./slide_objects/shape/ShapeType";
import {generateId, Id} from "./slide_objects/id/Id";

describe('Slide.ts', () => {
    test('Slide: createSlide', () => {
        const testSlide: Slide = {
            objects: {},
            background: Colors.WHITE,
        }
        expect(testSlide).toStrictEqual(createSlide());
    });

    test('Slide: addObject(textBox)', () => {
        const testSlide: Slide = {
            objects: {},
            background: Colors.WHITE,
        }
        const testTextBox: TextBox = {
            text: 'Тестовый текст 0',
            rect: createRect(),
            paragraph: createParagraph(),
            font: createFont(),
        };
        testSlide.objects[generateId()] = testTextBox;
        expect(testSlide).toStrictEqual(addObject(testSlide, testTextBox));
    });

    test('Slide: addObject(shape)', () => {
        const testSlide: Slide = {
            objects: {},
            background: Colors.WHITE,
        }
        const testShape: Shape = {
            shapeType: ShapeType.ELLIPSE,
            rect: createRect(),
            style: createStyle(),
        };
        testSlide.objects[generateId()] = testShape;
        expect(testSlide).toStrictEqual(addObject(testSlide, testShape));
    });

    test('Slide: addObject(picture)', () => {
        const testSlide: Slide = {
            objects: {},
            background: Colors.WHITE,
        }
        const testPicture: Picture = {
            src: 'svinya.png',
            rect: createRect(),
        };
        testSlide.objects[generateId()] = testPicture;
        expect(testSlide).toStrictEqual(addObject(testSlide, testPicture));
    });

    test('Slide: removeObject(objectIsSelected)', () => {
        const testSlide: Slide = {
            objects: {},
            background: Colors.WHITE,
        }
        const testPicture: Picture = {
            src: 'svinya.png',
            rect: createRect(),
        };
        const testId: Id = generateId();

        testSlide.objects[testId] = testPicture;

        if (testSlide.objects[testId]) {
            delete testSlide.objects[testId];
        }

        expect(testSlide).toStrictEqual(removeObject(testSlide, testId));
    });
});
import {
    SlidesMaker,
    createSlidesMaker,
    setSelectedSlide,
    addSlide,
    deleteSlide,
    addTextBoxOnSelectedSlide, removeSelectedObject
} from "./SlidesMaker";
import {Colors} from "./types/Colors";
import {createRect} from "./types/rect/Rect";
import {createParagraph} from "./types/paragraph/Paragraph";
import {createFont} from "./types/font/Font";

let slidesMakerTestData: SlidesMaker;

describe("SlidesMaker.ts", () => {
    test('SlidesMaker: createSlidesMaker', () => {
        slidesMakerTestData = createSlidesMaker();
        expect({
            slideList: [{
                textBoxes: [],
                selectedTextBox: null,
                shapes: [],
                selectedShape: null,
                pictures: [],
                selectedPicture: null,
                background: Colors.WHITE,
            }],
            currentSlide: 0,
        }).toStrictEqual(createSlidesMaker());
    });

    test('SlidesMaker: addSlide', () => {
        expect({
            slideList: [{
                textBoxes: [],
                selectedTextBox: null,
                shapes: [],
                selectedShape: null,
                pictures: [],
                selectedPicture: null,
                background: Colors.WHITE,
            },
                {
                    textBoxes: [],
                    selectedTextBox: null,
                    shapes: [],
                    selectedShape: null,
                    pictures: [],
                    selectedPicture: null,
                    background: Colors.WHITE,
                }],
            currentSlide: 1,
        }).toStrictEqual(addSlide(slidesMakerTestData));
    });

    test('SlidesMaker: setSelectedSlide', () => {
        expect({
            slideList: [{
                textBoxes: [],
                selectedTextBox: null,
                shapes: [],
                selectedShape: null,
                pictures: [],
                selectedPicture: null,
                background: Colors.WHITE,
            },
                {
                    textBoxes: [],
                    selectedTextBox: null,
                    shapes: [],
                    selectedShape: null,
                    pictures: [],
                    selectedPicture: null,
                    background: Colors.WHITE,
                }],
            currentSlide: 0,
        }).toStrictEqual(setSelectedSlide(slidesMakerTestData, 0));
    });

    test('SlidesMaker: deleteSlide', () => {
        expect({
            slideList: [{
                textBoxes: [],
                selectedTextBox: null,
                shapes: [],
                selectedShape: null,
                pictures: [],
                selectedPicture: null,
                background: Colors.WHITE,
            }],
            currentSlide: 0,
        }).toStrictEqual(deleteSlide(slidesMakerTestData));
    });

    test('SlidesMaker: addTextBoxOnSelectedSlide', () => {
        expect({
            slideList: [{
                textBoxes: [
                    {
                        text: '',
                        rect: createRect(),
                        paragraph: createParagraph(),
                        font: createFont(),
                    },
                ],
                selectedTextBox: 0,
                shapes: [],
                selectedShape: null,
                pictures: [],
                selectedPicture: null,
                background: Colors.WHITE,
            }],
            currentSlide: 0,
        }).toStrictEqual(addTextBoxOnSelectedSlide(slidesMakerTestData));
    });
});
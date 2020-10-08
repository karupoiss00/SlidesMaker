import { SlidesMaker, createSlidesMaker, setSelectedSlide, addSlide, deleteSlide } from "./SlidesMaker";
import { Colors } from "./types/Colors";

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
});

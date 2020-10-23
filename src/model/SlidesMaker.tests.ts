import {createSlide} from "./slide/Slide";
import {addSlide, createSlidesMaker, deleteSlide, setSelectedSlide, setBackground, SlidesMaker} from "./SlidesMaker";
import {Colors} from "./types/Colors";

describe('SlidesMaker.ts', () => {
    test('SlidesMaker: createSlidesMaker', () => {
        const testSlidesMaker: SlidesMaker = {
            slideList: [createSlide()],
            selectedObjectId: null,
            currentSlide: 0,
        }
        expect(testSlidesMaker).toStrictEqual(createSlidesMaker());
    });

    test('SlidesMaker: addSlide', () => {
        const testSlidesMaker1: SlidesMaker = {
            slideList: [createSlide()],
            selectedObjectId: null,
            currentSlide: 0,
        }
        const testSlidesMaker2: SlidesMaker = {
            slideList: [createSlide(), createSlide()],
            selectedObjectId: null,
            currentSlide: 1,
        }
        expect(testSlidesMaker2).toStrictEqual(addSlide(testSlidesMaker1));
    });

    test('SlidesMaker: deleteSlide', () => {
        const testSlidesMaker1: SlidesMaker = {
            slideList: [createSlide(), createSlide()],
            selectedObjectId: null,
            currentSlide: 1,
        }
        const testSlidesMaker2: SlidesMaker = {
            slideList: [createSlide()],
            selectedObjectId: null,
            currentSlide: 0,
        }
        expect(testSlidesMaker2).toStrictEqual(deleteSlide(testSlidesMaker1));
    });

    test('SlidesMaker: setSelectedSlide', () => {
        const testSlidesMaker1: SlidesMaker = {
            slideList: [createSlide(),createSlide()],
            selectedObjectId: null,
            currentSlide: 0,
        }
        const testSlidesMaker2: SlidesMaker = {
            slideList: [createSlide(),createSlide()],
            selectedObjectId: null,
            currentSlide: 0,
        }
        testSlidesMaker2.currentSlide = 1;
        expect(testSlidesMaker2).toStrictEqual(setSelectedSlide(testSlidesMaker1, 1));
    });

    test('SlidesMaker: setBackground', () => {
        const testSlidesMaker1: SlidesMaker = {
            slideList: [createSlide()],
            selectedObjectId: null,
            currentSlide: 0,
        }
        const testSlidesMaker2: SlidesMaker = {
            slideList: [createSlide()],
            selectedObjectId: null,
            currentSlide: 0,
        }
        testSlidesMaker2.slideList[0].background = Colors.PINK;
        expect(testSlidesMaker2).toStrictEqual(setBackground(testSlidesMaker1, Colors.PINK));
    });
});
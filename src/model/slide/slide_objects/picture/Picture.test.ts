import {createRect} from "../../../types/Rect";
import {createPicture, Picture} from './Picture';

describe('Picture.ts', () => {
    test('Picture: createPicture', () => {
        const testPicture: Picture = {
            src: 'picture.png',
            rect: createRect(),
        }
        expect(testPicture).toStrictEqual(createPicture('picture.png'));
    });
});
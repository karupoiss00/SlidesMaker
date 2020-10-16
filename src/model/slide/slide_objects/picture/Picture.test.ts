import {createRect} from "../../../types/rect/Rect";
import {createPicture, Picture} from './Picture';

describe('Picture.ts', () => {
    test('Picture: createPicture', () => {
        let testPicture: Picture = {
            src: 'picture.png',
            rect: createRect(),
        }
        expect(testPicture).toStrictEqual(createPicture('picture.png'));
    });
});
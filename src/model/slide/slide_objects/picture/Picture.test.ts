import {createRect} from "../../../types/rect/Rect";
import {createPicture} from './Picture';

describe('Picture.ts', () => {
    test('Picture: createPicture', () => {
        expect({
            src: 'C:/Pictures/picture.jpeg',
            rect: createRect(),
        }).toStrictEqual(createPicture('C:/Pictures/picture2.jpeg'));
    });
});
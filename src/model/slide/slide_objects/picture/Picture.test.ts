import {createRect} from "../../../types/Rect";
import {createPicture} from './Picture';

test('Picture: создание картинки', () => {
    expect({
        src: 'C:/Pictures/picture.jpeg',
        rect: createRect(),
    }).toStrictEqual(createPicture('C:/Pictures/picture.jpeg'));
});
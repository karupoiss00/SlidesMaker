import { ShapeType } from './ShapeType';
import { createShape } from './Shape';
import { createRect } from '../types/Rect';
import { createStyle } from '../types/Style';

describe('импорт ShapeType', () => {
    it('должен понимать ShapeType.RECTANGLE', () => {
        expect(ShapeType.RECTANGLE).toEqual('rectangle');
    });
    it('должен понимать ShapeType.TRIANGLE', () => {
        expect(ShapeType.TRIANGLE).toEqual('triangle');
    });
    it('должен понимать ShapeType.ELLIPSE', () => {
        expect(ShapeType.ELLIPSE).toEqual('ellipse');
    });
});

test('Shape: создание прямоугольника', () => {
    expect({
        shapeType: ShapeType.RECTANGLE,
        rect: createRect(),
        style: createStyle(),
    }).toStrictEqual(createShape(ShapeType.RECTANGLE));
});
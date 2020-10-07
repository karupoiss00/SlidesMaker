import { createRect, Rect } from '../types/Rect';
import { createStyle, Style } from '../types/Style';
import { ShapeType } from './ShapeType';

export type Shape = {
	shapeType: ShapeType;
	rect: Rect;
	style: Style;
};

function createShape(shapeType: ShapeType): Shape {
	return {
		shapeType: shapeType,
		rect: createRect(),
		style: createStyle(),
	};
}

export { createShape };
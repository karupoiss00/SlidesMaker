import { createRect, Rect } from '../types/Rect';

export type Picture = {
	src: string;
	rect: Rect;
};

function createPicture(src: string): Picture {
	return {
		src: src,
		rect: createRect(),
	};
}

export { createPicture };

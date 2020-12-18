import {Rect, setRectHeight, setRectWidth, setRectX, setRectY} from '../../../types/Rect';

export type Picture = {
    src: string;
    rect: Rect;
}

function createPicture(url: string, rect: Rect): Picture {
    return {
        src: url,
        rect: rect,
    }
}


function setPictureSrc(picture: Picture, src: string): Picture {
    return {
        ...picture,
        src: src,
    }
}

function setPictureX(picture: Picture, x: number): Picture {
    const newRect: Rect = setRectX(picture.rect, x);

    return {
        ...picture,
        rect: newRect,
    }
}

function setPictureY(picture: Picture, y: number): Picture {
    const newRect: Rect = setRectY(picture.rect, y);

    return {
        ...picture,
        rect: newRect,
    }
}

function setPictureWidth(picture: Picture, width: number): Picture {
    const newRect: Rect = setRectWidth(picture.rect, width);

    return {
        ...picture,
        rect: newRect,
    }
}

function setPictureHeight(picture: Picture, height: number): Picture {
    const newRect: Rect = setRectHeight(picture.rect, height);

    return {
        ...picture,
        rect: newRect,
    }
}

export {
    createPicture,
    setPictureSrc,
    setPictureX,
    setPictureY,
    setPictureWidth,
    setPictureHeight,
};
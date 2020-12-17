import {createRect, Rect, setRectHeight, setRectWidth, setRectX, setRectY} from '../../../types/Rect';
import {SlidePictureData, SlidesMaker} from "../../../SlidesMaker";
import {dispatch, getAppState} from "../../../../StateManager";

export type Picture = {
    src: string;
    rect: Rect;
}

function getImageSize(url: string) {
    return new Promise<{w: number; h: number}>( (resolved) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            resolved({
                w: img.naturalWidth,
                h: img.naturalHeight,
            })
        };
    })
}

function createPicture(url: string, rect: Rect): Picture {
    return {
        src: url,
        rect: rect,
    }
}

function uploadPictureFromUrl(url: string, fnToPayloadPicture: (slidesMaker: SlidesMaker, data: SlidePictureData) => SlidesMaker): void {
    const currentSlide =  getAppState().currentSlide;
    getImageSize(url).then((result) => {
        const picRect = createRect(100, 100, result.w,  result.h);
        if (currentSlide !== null)
        {
            dispatch(fnToPayloadPicture, { picture: createPicture(url, picRect), slideNumber: currentSlide })
        }
    });
}

function uploadPictureFromLocalStorage(fnToPayloadPicture: (slidesMaker: SlidesMaker, data: SlidePictureData) => SlidesMaker): void {
    const input = document.createElement('input');
    input.style.display = 'none';
    input.type = 'file';
    input.onchange = () => {
        if (input.files && input.files[0].type.match('image.*')) {
            const reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onload = (e) => {
                e.target && e.target.result &&
                    uploadPictureFromUrl(e.target.result.toString(), fnToPayloadPicture);
            }
        }
    }
    document.body.appendChild(input);
    input.click();
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
    uploadPictureFromLocalStorage,
    uploadPictureFromUrl,
};
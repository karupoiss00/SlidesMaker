import {createRect, Rect, setRectHeight, setRectWidth, setRectX, setRectY} from '../../../types/Rect';
import {addObjectOnSelectedSlide, setBackground} from "../../../SlidesMaker";
import {dispatch} from "../../../../StateManager";

export type Picture = {
    src: string;
    rect: Rect;
}

function getImageSize(url: string) {
    // eslint-disable-next-line no-undef
    return new Promise<{w: number; h: number}>( (resolved, rejected) => {
        const img = new Image()
        img.onload = () => {
            resolved({
                w: img.naturalWidth,
                h: img.naturalHeight
            })
        };
        img.src = url
    })
}

function createPicture(url: string, rect: Rect): Picture {
    return {
        src: url,
        rect: rect,
    }
}

function uploadPictureFromLocalStorage(onBackground: boolean): void {
    const input = document.createElement('input');
    input.style.display = 'none';
    input.type = 'file';
    input.onchange = () => {
        if (input.files && input.files[0].type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && e.target.result)
                {
                    const pictureURL = e.target.result.toString();
                    getImageSize(pictureURL).then((result) => {
                        const picRect = createRect(100, 100, result.w,  result.h);
                        if (onBackground) {
                            dispatch(setBackground, createPicture(pictureURL, picRect));
                        }
                        else
                        {
                            dispatch(addObjectOnSelectedSlide, createPicture(pictureURL, picRect));
                        }
                    });

                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    };
    document.body.appendChild(input);
    input.click();
}

function uploadPictureFromUrl(url: string, onBackground: boolean): void {
    getImageSize(url).then((result) => {
        const picRect = createRect(100, 100, result.w,  result.h);
        if (onBackground) {
            dispatch(setBackground, createPicture(url, picRect));
        }
        else
        {
            dispatch(addObjectOnSelectedSlide, createPicture(url, picRect));
        }
    });
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
import {SlidePictureData, SlidesMaker} from "../model/SlidesMaker";
import {dispatch, getAppState} from "../StateManager";
import {createRect} from "../model/types/Rect";
import {createPicture} from "../model/slide/slide_objects/picture/Picture";

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

function addPictureFromUrl(url: string, fnToPayloadPicture: (slidesMaker: SlidesMaker, data: SlidePictureData) => SlidesMaker): void {
    const currentSlide =  getAppState().currentSlide;
    getImageSize(url).then((result) => {
        const picRect = createRect(100, 100, result.w,  result.h);
        if (currentSlide !== null)
        {
            dispatch(fnToPayloadPicture, { picture: createPicture(url, picRect), slideNumber: currentSlide })
        }
    });
}

function addPictureFromLocalStorage(fnToPayloadPicture: (slidesMaker: SlidesMaker, data: SlidePictureData) => SlidesMaker): void {
    const input = document.createElement('input');
    input.style.display = 'none';
    input.type = 'file';
    input.onchange = () => {
        if (input.files && input.files[0].type.match('image.*')) {
            const reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onload = (e) => {
                e.target && e.target.result &&
                addPictureFromUrl(e.target.result.toString(), fnToPayloadPicture);
            }
        }
    }
    document.body.appendChild(input);
    input.click();
}

export {
    getImageSize,
    addPictureFromUrl,
    addPictureFromLocalStorage
}
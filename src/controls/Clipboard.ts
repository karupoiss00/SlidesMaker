import {TextBox} from "../model/slide/slide_objects/textbox/TextBox";
import {Shape} from "../model/slide/slide_objects/shape/Shape";
import {Picture} from "../model/slide/slide_objects/picture/Picture";
import {SlideObjectType} from "../model/slide/Slide";
import {dispatch} from "./StateManager";
import {addObjectOnSelectedSlide, setSelectedObject, updateTextBoxText} from "../model/SlidesMaker";

let clipboardState: TextBox | Shape | Picture | null = null;

function addToClipboard(object: SlideObjectType | null) {
    console.log(clipboardState);
    if (object)
    {
        clipboardState = object.object;
    }
    console.log(clipboardState);
}

function pasteFromClipboard(object: SlideObjectType | null) {
    if (clipboardState)
    {
        if ("text" in clipboardState)
        {
            if (object?.object && "text" in object?.object)
            {
                dispatch(updateTextBoxText, {
                    objectId: object.id,
                    newText: object.object.text + clipboardState.text
                });
            }
            else
            {
                dispatch(addObjectOnSelectedSlide, clipboardState);
                dispatch(setSelectedObject, null);
            }
        }
        else if (!(object?.object && "text" in object?.object))
        {
            dispatch(addObjectOnSelectedSlide, clipboardState);
            dispatch(setSelectedObject, null);
        }
    }

}

export {
    addToClipboard,
    pasteFromClipboard
}
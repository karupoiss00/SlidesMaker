import * as serviceWorker from './serviceWorker';
import {dispatch, start} from "./state/StateManager";
import {
    addObjectOnSelectedSlide, addPictureOnSlide,
    addSlide, setBackgroundPicture,
    setBackground,
    setSelectedSlide,
} from "./model/SlidesMaker";
import {Colors} from "./model/types/Colors";
import {addPictureFromUrl} from "./usecase/pictureUploader";
import {createTextBox, setTextBoxText, switchTextBoxBold} from "./model/slide/slide_objects/textbox/TextBox";
import {createRect} from "./model/types/Rect";
import {createParagraph, setParagraphAlignment} from "./model/types/Paragraph";
import {Alignment} from "./model/types/Alignment";
import {createFont, setFontFontColor} from "./model/types/Font";
import {createShape, setShapeShapeType, setShapeStrokeColor} from "./model/slide/slide_objects/shape/Shape";
import {ShapeType} from "./model/slide/slide_objects/shape/ShapeType";
import {createStyle} from "./model/types/Style";

const testBackgroundColor: Colors = Colors.BROWN;

start();
dispatch(setBackground, testBackgroundColor);
dispatch(addSlide, undefined);
addPictureFromUrl("https://i.imgur.com/eob00g2.png", setBackgroundPicture);
dispatch(addObjectOnSelectedSlide, switchTextBoxBold(setTextBoxText(createTextBox(
            createRect(500, 400, 500, 300),
            setParagraphAlignment(createParagraph(), Alignment.CENTER),
            setFontFontColor(createFont('Courier', 50), Colors.BLUE)),
            'Test Text Box 1')));
dispatch(setSelectedSlide, 0);
dispatch(addObjectOnSelectedSlide, setShapeStrokeColor(setShapeShapeType(createShape(
            ShapeType.ELLIPSE,
            createRect(400, 200, 300, 300),
            createStyle(Colors.GREEN, Colors.GAINSBORO, 10)),
            ShapeType.ELLIPSE),
            Colors.GAINSBORO));

addPictureFromUrl("https://www.meme-arsenal.com/memes/c145873e48b8c164274a3770cf3b5f18.jpg", addPictureOnSlide);
dispatch(addSlide, undefined);
addPictureFromUrl("https://i.imgur.com/VhDpTGG.png", setBackgroundPicture);

addPictureFromUrl("https://www.meme-arsenal.com/memes/c145873e48b8c164274a3770cf3b5f18.jpg", addPictureOnSlide);
serviceWorker.unregister();

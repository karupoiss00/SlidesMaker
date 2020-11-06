import * as serviceWorker from './serviceWorker';
import {dispatch, start} from "./EventDispatecher";
import {
    addObjectOnSelectedSlide,
    addSlide,
    setBackground,
    setSelectedSlide,
} from "./model/SlidesMaker";
import {Colors} from "./model/types/Colors";
import {createPicture, Picture} from "./model/slide/slide_objects/picture/Picture";
import {createTextBox, setTextBoxText, switchTextBoxBold} from "./model/slide/slide_objects/textbox/TextBox";
import {createRect} from "./model/types/Rect";
import {createParagraph, setParagraphAlignment} from "./model/types/Paragraph";
import {Alignment} from "./model/types/Alignment";
import {createFont, setFontFontColor} from "./model/types/Font";
import {createShape, setShapeShapeType, setShapeStrokeColor} from "./model/slide/slide_objects/shape/Shape";
import {ShapeType} from "./model/slide/slide_objects/shape/ShapeType";
import {createStyle} from "./model/types/Style";

const testBackgroundPicture2: Picture = createPicture("https://i.imgur.com/eob00g2.png");
const testBackgroundPicture3: Picture = createPicture("https://image.freepik.com/free-photo/jealous-and-sad-cute-guy-complaining-as-pointing-finger-upper-left-corner_176420-18943.jpg");
const testBackgroundColor: Colors = Colors.BROWN;

start();
dispatch(setBackground, testBackgroundColor);
dispatch(addSlide);
dispatch(setBackground, testBackgroundPicture2);
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
dispatch(addSlide);
dispatch(setBackground, testBackgroundPicture3);
dispatch(addObjectOnSelectedSlide, createPicture("https://www.meme-arsenal.com/memes/c145873e48b8c164274a3770cf3b5f18.jpg"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

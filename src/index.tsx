import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
    addObjectOnSelectedSlide,
    addSlide,
    createSlidesMaker,
    setBackground,
    setSelectedSlide,
    SlidesMaker
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

let slidesMaker: SlidesMaker = createSlidesMaker();

const testBackgroundPicture2: Picture = createPicture("https://i.imgur.com/eob00g2.png");
const testBackgroundPicture3: Picture = createPicture("https://www.meme-arsenal.com/memes/c145873e48b8c164274a3770cf3b5f18.jpg");
const testBackgroundColor: Colors = Colors.BROWN;

slidesMaker = setBackground(slidesMaker, testBackgroundColor);
slidesMaker = addSlide(slidesMaker);
slidesMaker = setBackground(slidesMaker, testBackgroundPicture2);
slidesMaker = setSelectedSlide(slidesMaker, 1);

slidesMaker = addObjectOnSelectedSlide(slidesMaker, switchTextBoxBold(setTextBoxText(createTextBox(
        createRect(400, 500, 500, 300),
        setParagraphAlignment(createParagraph(), Alignment.CENTER),
        setFontFontColor(createFont('Courier', 50), Colors.GREEN)),
    'Test Text Box 1')));

slidesMaker = setSelectedSlide(slidesMaker, 0);

slidesMaker = addObjectOnSelectedSlide(slidesMaker,  setShapeStrokeColor(setShapeShapeType(createShape(
    ShapeType.ELLIPSE,
    createRect(400, 200, 300, 300),
    createStyle(Colors.GREEN, Colors.GAINSBORO, 10)),
    ShapeType.ELLIPSE),
    Colors.GAINSBORO));

slidesMaker = addSlide(slidesMaker);
slidesMaker = setSelectedSlide(slidesMaker, 2);
slidesMaker = setBackground(slidesMaker, testBackgroundPicture3);
slidesMaker = addObjectOnSelectedSlide(slidesMaker, createPicture("https://www.meme-arsenal.com/memes/c145873e48b8c164274a3770cf3b5f18.jpg"));

ReactDOM.render(
  <React.StrictMode>
    <App
         appModel={slidesMaker}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
